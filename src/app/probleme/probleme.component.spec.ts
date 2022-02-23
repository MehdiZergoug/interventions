import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ ProblemeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  it('should create', () => {
  expect(component).toBeTruthy();
  });

  it("#1 | Zone PRÉNOM invalide avec 2 caractères", () => {
    // let errors = {};
    // let zone = component.problemeForm.get('prenom');
    // zone.setValue("a".repeat(3));
    // errors = zone.errors || {};
    // expect(errors['minLength']).toBeTruthy();

    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(2));
    let errors = zone.errors || {};
    expect(errors['minlength']).toBeTruthy();
  });

  it("#1 | Zone PRÉNOM valide avec 3 caractère", () => {


  });

  // it("#3 | Zone PRÉNOM valide avec 3 caractère", () => {
  // });

  it("#4 | Zone PRÉNOM invalide avec aucune valeur", () => {
  });

  it("#5 | Zone PRÉNOM valide avec 10 espace", () => {
  });

  it("#6 | Zone PRÉNOM valide avec 2 espace et 1 caractère", () => {
  });

});
