import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TypeproblemeService } from 'src/typeprobleme.service';
import { emailMatcherValidator } from '../shared/longueur-minimum/email-matcher/email-matcher.component';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './typeprobleme';
import { ProblemeData } from './typeprobleme-data';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;

  categoriesProduits: ITypeProbleme[];
  errorMessage: string;
  
  save(): void {
  }
  

 //  
  constructor(private fb: FormBuilder, private typesprobleme: TypeproblemeService ) { }

  ngOnInit(): void {
    this.problemeForm = this.fb.group({
      prenom: ['', [VerifierCaracteresValidator.longueurMinimum(3), Validators.required]],
      nom: ['', [Validators.maxLength(50), Validators.required]],
      noTypeprobleme: ['', [Validators.required]],
      courrielGroup: this.fb.group({
        courriel: [{value: '', disabled: true}],
        courrielConfirmation: [{value: '', disabled: true}],
      }),
      telephone: [{value: '', disabled: true}]
    });

    this.typesprobleme.obtenirTypeprobleme()
    .subscribe(cat => this.categoriesProduits = cat,
               error => this.errorMessage = <any>error); 
  }












  appliquerNotification(typeProbleme: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');   
    const courrielGroupControl = this.problemeForm.get('courrielGroup');      
    
    //const telephoneControl = this.problemeForm.get('telephone');     

    // Tous remettre à zéro
    courrielControl.clearValidators();
    courrielControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();  

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();    
    courrielConfirmationControl.disable();

    //telephoneControl.clearValidators();
    //telephoneControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    //telephoneControl.disable();  

    if (typeProbleme === 'Me notifier par courriel') {   
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);      
      courrielControl.enable();  
      courrielConfirmationControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);              
      courrielConfirmationControl.enable();  
            // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
            // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
            courrielGroupControl.setValidators([Validators.required]);  
            //telephoneControl.setValidators([Validators.required]);              
            //telephoneControl.enable();

            
            courrielGroupControl.setValidators([Validators.required, Validators.compose([emailMatcherValidator.courrielDifferents()])])
      }   
      else
      {
        if(typeProbleme === 'Ne pas me notifier par courriel')
        {
          courrielControl.setValidators([Validators.required]);      
          courrielControl.disable();

        }
      }
      courrielControl.updateValueAndValidity();   
      courrielConfirmationControl.updateValueAndValidity();


      //TELEPHONE
      
    const telephoneControl = this.problemeForm.get('telephone');     

    telephoneControl.clearValidators();
    telephoneControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    telephoneControl.disable();  

    if (typeProbleme === 'Me notifier par messagerie texte') {   
      telephoneControl.setValidators([Validators.required, Validators.pattern('[0-9]+'), VerifierCaracteresValidator.longueurMinimum(10), Validators.maxLength(10)]);              
      telephoneControl.enable();
       
      }   
      else
      {
        if(typeProbleme === 'Ne pas me notifier par messagerie texte')
        {

          

        }
      }
 
      telephoneControl.updateValueAndValidity();

  }



  // appliquerNotificationTelephone(typeProbleme: string): void {

  //   const telephoneControl = this.problemeForm.get('telephone');     

  //   telephoneControl.clearValidators();
  //   telephoneControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
  //   telephoneControl.disable();  

  //   if (typeProbleme === 'Me notifier par courriel') {   

       
  //     }   
  //     else
  //     {
  //       if(typeProbleme === 'Ne pas me notifier par courriel')
  //       {
  //         telephoneControl.setValidators([Validators.required]);              
  //         telephoneControl.enable();
          

  //       }
  //     }
 
  //     telephoneControl.updateValueAndValidity();        
  // }
}
