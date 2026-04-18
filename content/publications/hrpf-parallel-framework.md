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
venue: Parallel Computing · CCF B
status: Published
year: 2026
paperUrl: https://www.sciencedirect.com/science/article/pii/S0167819126000050
abstract: Recursion, as a common programming paradigm, is widely applied in numerous applications. By treating recursive problems as tasks, the recursion process generates many independent subtasks, which reveals the potential for parallelism. To harness this parallelism on heterogeneous CPU–GPU systems, this paper introduces HRPF (Heterogeneous Recursive Parallel Programming Framework). HRPF provides a set of programming interfaces to define recursive algorithms, shielding users from the complexities of task allocation, scheduling, and data movement. This facilitates the efficient and straightforward implementation of parallel recursive programs on CPU–GPU systems. HRPF dispatches tasks between CPU and GPU workers by combining depth-first search (DFS) and breadth-first search (BFS) strategies. It adopts a hybrid work-stealing scheduling algorithm incorporating both work-first and help-first policies to achieve dynamic load balancing. The HRPF runtime system ensures data consistency between the host and the device and overlaps computation with data transfer. Additionally, HRPF provides a set of parallel loop programming interfaces. To evaluate HRPF, we implement several benchmarks including merge sort, quicksort, Strassen–Winograd matrix multiplication, and parallel loops in four commonly used algorithms. Experimental results on a CPU–GPU platform demonstrate that HRPF achieves superior performance across a range of benchmarks compared to OpenMP, StarPU and Taskflow.
timestamp: 2026-04-18
---

该条目用于 Publications 列表页展示。
