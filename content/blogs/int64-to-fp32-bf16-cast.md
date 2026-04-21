---
title: 位运算转换
slug: int64-to-fp32-bf16-cast
description: 从整数与浮点数位级表示出发，推导 int 与 float 互转的计算过程，并结合一个只能用两个 int32 表示 int64 的实战例子，手写 int64 到 fp32/bf16 的转换函数。
longDescription: 从符号位、指数位、尾数位与舍入规则出发，介绍 int 与 float 之间的位级转换过程，并结合两个 int32 表示 int64 的实战场景，手写 int64 到 fp32/bf16 的转换函数。
tags:
  - C++
  - Floating Point
  - fp32
  - bf16
readTime: 8
featured: false
timestamp: 2026-04-21
---

在做浮点数和整型数之间的类型转换时, 我们往往习惯使用`static_cast<>()`或者直接`type()`了事, 这对cpp原生支持的类型没有问题. 但是一些情况下, 我们需要自己实现不同的位运算转换函数, 包括但不限于:
- 需要支持bf16、e4m3/e5m2的fp8
- 对输入/输出的整型字长有限制

## 计算过程
想象一下, 如果把**int转换成float**, 需要做哪些步骤? 很显然, 就是要计算符号位、指数和尾数. 除此之外, 还要注意舍入的问题, 当int绝对值比较大时, float可能是无法精确表示的, 需要进行**舍入**. 那么总的步骤就是:
1. 提取符号位和绝对值
2. 计算指数: 计算小于等于输入整数的最近的2的幂次, 再加上偏移量偏移量
3. 计算尾数: 规格化移位后减去刚才算的指数, 得到尾数
4. 舍入: 尾数以外的位也是有用的, 可以用于舍入. 舍入有多种规则, IEEE 754的规则是`round to nearest, ties to even`: 舍入到最近的, 0.5时舍入到偶数
5. 拼装结果

还有一点, **转换后会不会出现非规格数**? 首先**NaN是永远不会出现的**, 因为整型一定是个数; 有可能会出现正负无穷, 比如int32转fp8(e4m3), 此时fp8的指数位最多表示到$2^{e-1}=8$, 是没有办法表示int32的31位的

如果是**float转换int**, 那其实就简单很多了, 按照浮点数的数值公式直接计算就好了, 算出来的数舍入一下直接就是结果, 可能有溢出
## 实战

最近在工作中有一个需求, 需要把int64转换成fp32/bf16. 由于bf16相当于是fp32截断后16位, 所以只写转换fp32的就够了. 除此以外, 还有一个限制是没有办法原生表示int64, **只能用两个int32分别代表int64的高32位和低32位**, 那么函数签名应当如下:
```cpp
float int64_cast_fp32(int high, int low);
```

### 符号位/绝对值
```cpp
{
    int sign = (high >> 31) & 1;
    // 为负数时取反+1计算绝对值
    int absolute_low = sign ? ~low + 1: low;
    // 处理low溢出
    int absolute_high = sign ? ~high + (low == 0) : high;
    // 0特殊处理
    if ((absolute_high | absolute_low) == 0) return 0.0f;
    // absolute_high == 0时也可以单独处理, 此时给low带上符号位变为signed_low, 就可以算int32_cast_fp32(signed_low)
}
```

### 指数位
```cpp
{
    int clz = 0, temp = absolute_high == 0 ? absolute_low : absolute_high;
    // 下面这几个if是clz的实现, 如果硬件支持就该直接用clz指令
    if ((temp & 0xFFFF0000) == 0) { clz += 16; temp <<= 16; }
    if ((temp & 0xFF000000) == 0) { clz +=  8; temp <<=  8; }
    if ((temp & 0xF0000000) == 0) { clz +=  4; temp <<=  4; }
    if ((temp & 0xC0000000) == 0) { clz +=  2; temp <<=  2; }
    if ((temp & 0x80000000) == 0) { clz +=  1; }
    int p = 63 - (absolute_high == 0) * 32 - clz;
    constexpr int BIAS = 127; // fp32的偏置
    int exp = p + BIAS;
}
```

### 尾数位
首先要进行左移, 这一步的意义是构造出尾数`1.xxxxxx`的格式; 向左移动一直到把第一个1也就是"leading 1"挤出去为止, 这样剩下的就是尾数, 截断前23位(对于fp32, 尾数有23位)得到尾数位

```cpp
{
    int shift = clz + 1;
    int shift_high = 0, shift_low = 0;

    if (shift < 32) {
        shift_high = (absolute_high << shift) | (absolute_low >> (32 - shift));
        shift_low = absolute_low << shift;
    } else if (shift == 32) {
        shift_high = absolute_low;
        // shift_low = 0;
    } else if (shift < 64) {
        shift_high = absolute_low << (shift - 32);
        // shift_low = 0;
    } else {
        // shift_high = 0;
        // shift_low = 0;
    }
    
    int frac = (shift_high >> 9) & 0x7FFFFF;
}
```

### 舍入
尾数后面的位并不是没用。对于 fp32，我们最终只保留 23 位尾数，因此更低位的信息要用于决定是否进位。这里会用到两个概念：`guard` 位和 `sticky` 位。
```
         shifted_hi (32 位)                      shifted_lo (32 位)
bit:  31 ─────────── 9   8   7 ──── 0           31 ──────────── 0
      ├── frac: 23位 ──┤  g   ├─ 8位 ──┤         ├──── 32位 ─────┤
                        guard  └──── sticky 区 ──────────────────┘
                                         共 40 位
```
其中：
- `frac`：最终保留的 23 位尾数
- `guard`：紧接在 `frac` 后面的 1 位
- `sticky`：`guard` 后面所有被截断位的按位 OR，只要这些位里有任意一个为 1，`sticky` 就为 1
IEEE 754 默认采用的舍入方式是 **round to nearest, ties to even**，也就是“舍入到最近值，若恰好位于中间则取偶数”。在 `guard/sticky` 表示下，规则可以写成：
- `guard = 0`：被舍弃部分小于 `0.5 ULP`，一定不进位
- `guard = 1` 且 `sticky = 1`：被舍弃部分大于 `0.5 ULP`，一定进位
- `guard = 1` 且 `sticky = 0`：被舍弃部分恰好等于 `0.5 ULP`
    - 若当前 `frac` 最低位为 1，则进位，使结果变成偶数
    - 若当前 `frac` 最低位为 0，则不进位，保持偶数

```cpp
{
    int guard = (shift_high >> 8) & 1;  
    int sticky = ((shift_high & 0xFF) != 0) || (shift_low != 0);  
  
    // round to nearest, ties to even  
    if (guard && (sticky || (frac & 1))) {  
        frac += 1;  
        // 尾数进位溢出：1.111... -> 10.000...  
        if (frac == 0x800000) {  
            frac = 0;  
            exp += 1;  
        }  
    }
}
```

### 拼装结果
```cpp
{
    uint32_t bits = (static_cast<uint32_t>(sign) << 31) |
                    (static_cast<uint32_t>(exp)  << 23) |
                    static_cast<uint32_t>(frac);

    float result;
    std::memcpy(&result, &bits, sizeof(result));
    return result;
}
```


### 函数总览
```cpp
float int64_cast_fp32(int high, int low) {
    int sign = (high >> 31) & 1;
    // 为负数时取反+1计算绝对值
    int absolute_low = sign ? ~low + 1: low;
    // 处理low溢出
    int absolute_high = sign ? ~high + (low == 0) : high;
    // 0特殊处理
    if ((absolute_high | absolute_low) == 0) return 0.0f;
    // absolute_high == 0时也可以单独处理, 此时给low带上符号位变为signed_low, 就可以算int32_cast_fp32(signed_low)
    int high_is_zero = absolute_high == 0;
    int clz = high_is_zero * 32;
    int temp = high_is_zero? absolute_low : absolute_high;
    // 下面这几个if是clz的实现, 如果硬件支持就该直接用clz指令
    if ((temp & 0xFFFF0000) == 0) { clz += 16; temp <<= 16; }
    if ((temp & 0xFF000000) == 0) { clz +=  8; temp <<=  8; }
    if ((temp & 0xF0000000) == 0) { clz +=  4; temp <<=  4; }
    if ((temp & 0xC0000000) == 0) { clz +=  2; temp <<=  2; }
    if ((temp & 0x80000000) == 0) { clz +=  1; }
    int shift = clz + 1;
    int shift_high = 0, shift_low = 0;

    if (shift < 32) {
        shift_high = (absolute_high << shift) | (absolute_low >> (32 - shift));
        shift_low = absolute_low << shift;
    } else if (shift < 64) {
        shift_high = absolute_low << (shift - 32);
        // shift_low = 0;
    } else {
        // shift_high = 0;
        // shift_low = 0;
    }
    
    int frac = (shift_high >> 9) & 0x7FFFFF;
    int guard = (shift_high >> 8) & 1;  
    int sticky = ((shift_high & 0xFF) != 0) || (shift_low != 0);  
    constexpr int BIAS = 127; // fp32的偏置
    int exp = BIAS + 63 - clz;
  
    // round to nearest, ties to even  
    if (guard && (sticky || (frac & 1))) {  
        frac += 1;  
        // 尾数进位溢出：1.111... -> 10.000...  
        if (frac == 0x800000) {  
            frac = 0;  
            exp += 1;  
        }  
    }
    uint32_t bits = (static_cast<uint32_t>(sign) << 31) |
                    (static_cast<uint32_t>(exp)  << 23) |
                    static_cast<uint32_t>(frac);

    float result;
    std::memcpy(&result, &bits, sizeof(result));
    return result;
}
```