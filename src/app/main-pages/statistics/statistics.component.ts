import { Component } from '@angular/core';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss'
})
export class StatisticsComponent {
  basicData: any;
  basicOptions: any;
  data: any;
  options: any;

  isLoading: boolean = true
  avarageMinPrice!:number
  avarageMaxPrice!:number

  constructor(private statisticsService: StatisticsService, private messageService: MessageService) {
    this.getBasicStatistics()
  }

  getBasicStatistics() {
    this.statisticsService.getBasicStatistics().subscribe({
      next: (response) => {
        this.generateSearchPatternStatistics(response["searchPattern"])
        this.generateCategoryStatistics(response["categories"])
        this.avarageMinPrice=response["avarageMinPrice"]
        this.avarageMaxPrice=response["avarageMaxPrice"]
        this.isLoading = false
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: 'Xato', detail: 'Nimadir xato ketdi!' });
        this.isLoading = false
      }
    })
  }

  generateSearchPatternStatistics(searchPatterns: any) {

    let searchWords: string[] = new Array()
    let searchCounts: number[] = new Array()

    searchPatterns.forEach((searchPattern: any) => {
      searchWords.push(searchPattern["searchWord"])
      searchCounts.push(searchPattern["searchCount"])
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.basicData = {
      labels: searchWords,
      datasets: [
        {
          label: 'necha marta',
          data: searchCounts,
          backgroundColor: ['rgba(255, 159, 64, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)'],
          borderColor: ['rgb(255, 159, 64)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)'],
          borderWidth: 1
        }
      ]
    };

    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  generateCategoryStatistics(categories:any) {

    let categoriesName:string[]=new Array()
    let SearchCounts:string[]=new Array()

    categories.forEach((category: any) => {
      categoriesName.push(category["name"])
      SearchCounts.push(category["searchCount"])
    });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: categoriesName,
      datasets: [
        {
          label:"necha marta",
          data: SearchCounts,
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--gray-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--gray-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

}
