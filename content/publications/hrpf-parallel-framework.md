---
title: "HRPF: A parallel programming framework for recursive algorithms on heterogeneous CPU–GPU systems"
slug: hrpf-parallel-framework
authors:
  - Wang Y
  - Liu B
  - Shao S
  - Gao J
  - Ji W
  - Xing H
venue: Parallel Computing
status: 已发表
year: 2026
paperUrl: https://www.sciencedirect.com/science/article/pii/S0167819126000050
abstract: 该论文提出面向异构 CPU–GPU 系统的递归并行编程框架 HRPF。HRPF 将递归问题抽象为任务，通过编程接口屏蔽任务划分、调度与数据移动等复杂性，帮助用户更高效地实现并行递归程序。框架结合 DFS 与 BFS 策略在 CPU 与 GPU worker 之间分发任务，并采用融合 work-first 与 help-first 策略的混合 work-stealing 调度算法实现动态负载均衡。运行时系统负责维护主机与设备之间的数据一致性，并对计算与数据传输进行重叠优化。实验结果表明，HRPF 在归并排序、快速排序、Strassen–Winograd 矩阵乘法及多类并行循环基准上，相比 OpenMP、StarPU 与 Taskflow 取得了更优性能。
timestamp: 2026-04-18
---

该条目用于 Publications 列表页展示。
