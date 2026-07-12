import { Component, input } from '@angular/core';

@Component({
	selector: 'app-mensaje-error',
	standalone: true,
	imports: [],
	templateUrl: './mensaje-error.component.html',
})

export class MensajeErrorComponent {
	mensaje = input.required<string>();
	mostrar = input<boolean>(false);
}
