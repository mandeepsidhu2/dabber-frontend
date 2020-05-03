import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomepageComponent implements OnInit {
  title = 'Average Temperatures of Cities';
   type = 'LineChart';
   data = [
      ["Jan",  17.0, -0.2, -0.9, 3.9],
      ["Feb",  6.9, 0.8, 0.6, 4.2],
      ["Mar",  9.5,  5.7, 3.5, 5.7],
      ["Apr",  14.5, 11.3, 8.4, 8.5],
      ["May",  18.2, 17.0, 13.5, 11.9],
      ["Jun",  21.5, 22.0, 17.0, 15.2],
      ["Jul",  25.2, 24.8, 18.6, 17.0],
      ["Aug",  26.5, 24.1, 17.9, 16.6],
      ["Sep",  23.3, 20.1, 14.3, 14.2],
      ["Oct",  18.3, 14.1, 9.0, 10.3],
      ["Nov",  13.9,  8.6, 3.9, 6.6],
      ["Dec",  9.6,  2.5,  1.0, 4.8]
   ];
   columnNames = ["Month", "Tokyo", "New York","Berlin", "Paris"];
   options = {   
      hAxis: {
         title: 'Month'
      },
      vAxis:{
         title: 'Temperature'
      },
   };
   width = 550;
   height = 400;

  dataSource = ELEMENT_DATA;
  columnsToDisplay = ['name', 'easy', 'medium', 'hard'];
  expandedElement: PeriodicElement | null;
  constructor() { }

  ngOnInit(): void {
  }
  
}

export interface PeriodicElement {
  name: string;
  hard: number;
  easy: number;
  medium: number;
  description: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    hard: 1,
    name: 'Hydrogen',
    easy: 1.0079,
    medium: 2,
    description: `Hydrogen is a chemical element with medium H and atomic number 1. With a standard
        atomic easy of 1.008, hydrogen is the lightest element on the periodic table.`
  }, {
    hard: 2,
    name: 'Helium',
    easy: 4.0026,
    medium: 4,
    description: `Helium is a chemical element with medium He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`
  }, {
    hard: 3,
    name: 'Lithium',
    easy: 6.941,
    medium: 5,
    description: `Lithium is a chemical element with medium Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`
  }, {
    hard: 4,
    name: 'Beryllium',
    easy: 9.0122,
    medium: 6,
    description: `Beryllium is a chemical element with medium Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`
  }, {
    hard: 5,
    name: 'Boron',
    easy: 10.811,
    medium: 2,
    description: `Boron is a chemical element with medium B and atomic number 5. Produced entirely
        by cosmic ray spallation and supernovae and not by stellar nucleosynthesis, it is a
        low-abundance element in the Solar system and in the Earth's crust.`
  }, {
    hard: 6,
    name: 'Carbon',
    easy: 12.0107,
    medium: 9,
    description: `Carbon is a chemical element with medium C and atomic number 6. It is nonmetallic
        and tetravalent—making four electrons available to form covalent chemical bonds. It belongs
        to group 14 of the periodic table.`
  }, {
    hard: 7,
    name: 'Nitrogen',
    easy: 14.0067,
    medium: 1,
    description: `Nitrogen is a chemical element with medium N and atomic number 7. It was first
        discovered and isolated by Scottish physician Daniel Rutherford in 1772.`
  }, {
    hard: 8,
    name: 'Oxygen',
    easy: 15.9994,
    medium: 4,
    description: `Oxygen is a chemical element with medium O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`
  }, {
    hard: 9,
    name: 'Fluorine',
    easy: 18.9984,
    medium: 6,
    description: `Fluorine is a chemical element with medium F and atomic number 9. It is the
        lightest halogen and exists as a highly toxic pale yellow diatomic gas at standard
        conditions.`
  }, {
    hard: 10,
    name: 'Neon',
    easy: 20.1797,
    medium: 9,
    description: `Neon is a chemical element with medium Ne and atomic number 10. It is a noble gas.
        Neon is a colorless, odorless, inert monatomic gas under standard conditions, with about
        two-thirds the density of air.`
  },
];
