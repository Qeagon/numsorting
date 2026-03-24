import { Injectable } from '@angular/core';

export type SortAlgorithm = 'merge' | 'quick' | 'heap' | 'insertion';

export interface SortResult {

  sorted: number[];
  algorithm: SortAlgorithm;
  timeComplexity: {

    best: string;
    average: string;
    worst: string;

  };
}

@Injectable({

  providedIn: 'root'

})

export class SortService {

  sort(numbers: number[], algorithm: SortAlgorithm): SortResult {
    const sorted = [...numbers];

    switch (algorithm) {

      case 'merge': this.mergeSort(sorted, 0, sorted.length -1); break;
      case 'quick': this.quickSort(sorted, 0, sorted.length -1); break;
      case 'heap': this.heapSort(sorted); break;
      case 'insertion': this.insertionSort(sorted); break;

    }
    return { sorted, algorithm, timeComplexity: this.getComplexity(algorithm) };

  }

  private mergeSort(arr: number[], l: number, r: number): void {
    if (l >= r) return;
    const mid = Math.floor((l + r) / 2);
    this.mergeSort(arr, l, mid);
    this.mergeSort(arr, mid + 1, r);
    this.merge(arr, l, mid, r);
  }

   private merge(arr: number[], l: number, mid: number, r: number): void {
    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);
    let i = 0, j = 0, k = l;
    while (i < left.length && j < right.length) {
      arr[k++] = left[i] <= right[j] ? left[i++] : right[j++];
    }
    while (i < left.length) arr[k++] = left[i++];
    while (j < right.length) arr[k++] = right[j++];
  }

  private quickSort(arr: number[], low: number, high: number): void {
    if (low >= high) return;
    const pi = this.partition(arr, low, high);
    this.quickSort(arr, low, pi - 1);
    this.quickSort(arr, pi + 1, high);
  }

  private partition(arr: number[], low: number, high: number): number {
    const pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
      if (arr[j] <= pivot) { i++; [arr[i], arr[j]] = [arr[j], arr[i]]; }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
  }

  private heapSort(arr: number[]): void {
    const n = arr.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) this.heapify(arr, n, i);
    for (let i = n - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      this.heapify(arr, i, 0);
    }
  }

  private heapify(arr: number[], n: number, i: number): void {
    let largest = i;
    const l = 2 * i + 1, r = 2 * i + 2;
    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;
    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];
      this.heapify(arr, n, largest);
    }
  }

  private insertionSort(arr: number[]): void {
    for (let i = 1; i < arr.length; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) { arr[j + 1] = arr[j]; j--; }
      arr[j + 1] = key;
    }
  }

  private getComplexity(algorithm: SortAlgorithm) {
    const map = {
      merge:     { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      quick:     { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
      heap:      { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
      insertion: { best: 'O(n)',       average: 'O(n²)',       worst: 'O(n²)' },
    };
    return map[algorithm];
  }
}

