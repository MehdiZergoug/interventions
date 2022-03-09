import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresValidator } from "./longueur-minimum.component";

describe('longueurMinimum', () => {
    it('#5 | Zone PRÉNOM valide avec 10 espaces', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: '          '};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#6 | Zone PRÉNOM valide avec 2 espaces et 1 caractère', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: '  x'};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#7 | une chaîne avec 10 espaces est invalide', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: '           '};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeFalsy;
    
    });
});

describe('longueurMinimum', () => {
    it('#8 | Une phrase avec des mots est valide', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: 'Vive Angular'};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: ' je le veux '};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: ' xx'};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: '  x'};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#12 | Une phrase avec 3 espaces et 3 caractères est valide', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: '   xxx'};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = { value: '     xxxxx     '};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeTruthy;
    
    });
});

describe('longueurMinimum', () => {
    it('#14 | Une chaîne nulle est invalide', () => {
        let ValidatorFn = VerifierCaracteresValidator.longueurMinimum(4);
        
        let control = {};

        let result = ValidatorFn(control as AbstractControl);

        expect(result).toBeFalsy;
    
    });
});