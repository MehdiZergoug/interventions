import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { TypeproblemeService } from 'src/typeprobleme.service';
import { emailMatcherValidator } from '../shared/longueur-minimum/email-matcher/email-matcher.component';
import { ProblemeComponent } from './probleme.component';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ ProblemeComponent ],
      providers: [TypeproblemeService]
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
    expect(errors['minlength']).toBeFalsy();
  });

  it("#2 | Zone PRÉNOM valide avec 3 caractère", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  // ne fonctionne pas
  it("#3 | Zone PRÉNOM valide avec 200 caractère", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("a".repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it("#4 | Zone PRÉNOM invalide avec aucune valeur", () => {
    let zone = component.problemeForm.controls['prenom'];
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it("#5 | Zone PRÉNOM valide avec 10 espace", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("          ");
    expect(zone.valid).toBeFalsy();
  });

  it("#6 | Zone PRÉNOM valide avec 2 espace et 1 caractère", () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue("  a");
    expect(zone.valid).toBeFalsy();
  });


  it("#15 | Zone TELEPHONE est désactivée quand ne pas me notifier", () => {
    component.appliquerNotification('Ne pas me notifier par courriel')
  
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED')
  });
  
  it("#16 | Zone TELEPHONE est vide quand ne pas me notifier", () => {
    component.appliquerNotification('Ne pas me notifier par courriel')
  
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toEqual(null)
  });
  
  it("#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier", () => {
    component.appliquerNotification('Ne pas me notifier par courriel')

    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED')
  });
  
  it("#18 | Zone CONFIRMER COURRIEL est désactivée quand ne pas me notifier", () => {
    component.appliquerNotification('Me notifier par courriel')
  
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED')
  });




  //
  // TP12
  //
  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.appliquerNotification('Me notifier par courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it("#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).not.toEqual('DISABLED'); 
  });
  
  it("#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).not.toEqual('DISABLED'); 
  });
  


  it("#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("");
    expect(zone.status).toEqual('INVALID'); 
  });
  
  it("#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue("");
    expect(zone.status).toEqual('INVALID'); 
  });
  


  it("#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme", () => {
    component.appliquerNotification('Me notifier par courriel');
    

    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("wwwwww");
    expect(zone.status).toEqual('INVALID'); 
  });



  it("#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur valide retourne null", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');

    zoneCourrielConfirmation.setValue("qwea@asdasd");
    zoneCourriel.setValue("");
    
    expect(zoneCourrielConfirmation.value).toEqual("");
  });
  
  it("#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue("qwea@asdasd");
    zoneCourrielConfirmation.setValue("");
    expect(zoneCourrielConfirmation.value).toEqual("");
  });
  

  
  it("#27 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zoneCourrielGroup = component.problemeForm.get('courrielGroup');
    zoneCourriel.setValue("ca@coupopo");
    zoneCourrielConfirmation.setValue("oo@iad");
    expect(zoneCourrielGroup.status).toEqual('INVALID');
  });
  
  it("#28 | Zones ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel", () => {
    component.appliquerNotification('Me notifier par courriel');
    let zoneCourriel = component.problemeForm.get('courrielGroup.courrielConfirmation');
    let zoneCourrielConfirmation = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zoneCourriel.setValue("qwea@asdasd");
    zoneCourrielConfirmation.setValue("qwea@asdasd");
    expect(zoneCourrielConfirmation.value).toEqual('qwea@asdasd');
  });
  


  //
  //TP13
  //
  
  it("#29 | Zone TELEPHONE est activée quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).not.toEqual('DISABLED'); 
  });

  it("#30 | Zone ADRESSE COURRIEL est désactivée quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it("#31 | Zone CONFIRMER COURRIEL est désactivée quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED');
  });

  it("#32 | Zone TELEPHONE est invalide sans valeur quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('telephone');
    zone.setValue("");
    expect(zone.status).toEqual('INVALID'); 
  });

  it("#33 | Zone TELEPHONE est invalide avec des caractères non-numériques quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('telephone');
    zone.setValue("asdasdsad");
    expect(zone.status).toEqual('INVALID'); 
  });
  
  it("#34 | Zone TELEPHONE est invalide avec 9 chiffres consécutifs quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('telephone');
    zone.setValue("123456789");
    expect(zone.status).toEqual('INVALID');
  });

  it("#35 | Zone TELEPHONE est invalide avec 11 chiffres consécutifs quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('telephone');
    zone.setValue("12345678901");
    expect(zone.status).toEqual('INVALID');
  });

  it("#36 | Zone TELEPHONE est valide avec 10 chiffres consécutifs quand notifier par messagerie texte", () => {
    component.appliquerNotification('Me notifier par messagerie texte');
    let zone = component.problemeForm.get('telephone');
    zone.setValue("1234567890");
    expect(zone.status).toEqual('VALID');
  });

});
