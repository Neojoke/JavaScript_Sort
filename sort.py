#!/usr/bin/env python3
# -*- coding:utf-8 -*-


def heapAdjust(arr, s, length):
    temp = arr[s]
    child = 2 * s + 1
    while child < length:
        if child + 1 < length and arr[child+1] < arr[child]:
            child = child+1
        if arr[child] < arr[s]:
            arr[s] = arr[child]
            s = child
            child = s * 2 + 1
        else:
            break
        arr[s] = temp
    return arr


def heapBuild(arr, length):
    a = list(range(0, (length - 1) // 2 + 1))
    a = a[::-1]
    for index in a:
        arr = heapAdjust(arr, index, length)
    return arr

def heapSort(arr, length):
    arr = heapBuild(arr, length)
    a = list(range(0, length))[::-1]
    for index in a:
        temp = arr[index]
        arr[index] = arr[0]
        arr[0] = temp
        arr = heapAdjust(arr, 0, index)
    print(arr)
    return arr

heapSort([1, 5, 0, 10, 8, 20], 6)