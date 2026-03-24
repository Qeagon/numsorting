import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SortService, SortAlgorithm, SortResult } from './services/sorter.service';

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  inputValue: number | null = null;
  numbers: number[] = [];
  selectedAlgorithm: SortAlgorithm = 'merge';
  result: SortResult | null = null;

  algorithms: SortAlgorithm[] = ['merge', 'quick', 'heap', 'insertion'];

  constructor(private sortService: SortService) {}

  addNumber(): void {
    if (this.inputValue === null) return;
    this.numbers.push(this.inputValue);
    this.inputValue = null;
    this.runSort();
  }

  selectAlgorithm(algo: SortAlgorithm): void {
    this.selectedAlgorithm = algo;
    this.runSort();
  }

  clearArray(): void {
    this.numbers = [];
    this.result = null;
  }

  private runSort(): void {
    if (this.numbers.length === 0) return;
    this.result = this.sortService.sort(this.numbers, this.selectedAlgorithm);
  }
}