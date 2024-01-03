import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddVacuumRequest } from 'src/app/model';
import { VacuumService } from 'src/app/services/vacuum/vacuum.service';

@Component({
  selector: 'app-add-vacuum',
  templateUrl: './add-vacuum.component.html',
  styleUrls: ['./add-vacuum.component.css']
})
export class AddVacuumComponent {
  vacuumName: string = '';
  
  constructor(private router: Router, private vacuumService: VacuumService) {
  }

  onSubmit() {
    // Perform the logic to add the vacuum with the provided name
    console.log(this.vacuumName)
    console.log("aaa")
    const request: AddVacuumRequest = {
      name: this.vacuumName,
    };
    this.vacuumService.addVacuum(request).subscribe(
      (response) => {
        if (response == 201) {
          alert('Vacuum added successfully');
          this.router.navigate(['/search']);
        }
        else {
          alert('Error adding vacuum');
        }
      },
      (error) => {
        // Handle errors
        console.error('Error:', error);
      }
    );
  }
}