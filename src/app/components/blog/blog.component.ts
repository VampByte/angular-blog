import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INoticia } from '../../interfaces/INoticia';
import { MensajeErrorComponent } from '../mensaje-error/mensaje-error.component';


@Component({
	selector: 'app-blog',
	standalone: true,
	imports: [FormsModule, MensajeErrorComponent],
	templateUrl: './blog.component.html',
})
export class BlogComponent {
	noticias = signal<INoticia[]>([
		{
			id: 1,
			titulo: 'Angular 22 ya está aquí',
			imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
			texto:
				'El equipo de Angular acaba de anunciar la versión 22 con nuevas APIs reactivas, mejor rendimiento y un sistema de control flow mucho más expresivo.',
			fecha: '2026-05-12',
		},
		{
			id: 2,
			titulo: 'Signals: el futuro de la reactividad',
			imagen: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
			texto:
				'Las Signals ofrecen una forma sencilla y eficiente de gestionar el estado en Angular, evitando las complicaciones de RxJS para casos síncronos.',
			fecha: '2026-06-03',
		},
	]);

	titulo = signal('');
	imagen = signal('');
	texto = signal('');
	fecha = signal('');

	intentoEnviar = signal(false); // Para saber si se intenta enviar el formulario y validar los campos vacios en el momento que pasa a TRUE.

	private nextId = 3; // El siguiente ID disponible para una noticia, ya que tengo 1 y 2 precargadas.

	/**
	 * Comprueba si el campo es válido.
	 * Se llama esta funcion en cada input del formulario.
	 * @param valor El valor del campo.
	 * @returns Si el campo es válido.
	 */
	mostrarError(valor: string): boolean {
		return this.intentoEnviar() && valor.trim().length === 0;
	}

	/**
	 * @returns True - Si el formulario tiene campos inválidos.
	 */
	formularioInvalido(): boolean {
		return (
			this.titulo().trim().length === 0 ||
			this.imagen().trim().length === 0 ||
			this.texto().trim().length === 0 ||
			this.fecha().trim().length === 0
		);
	}

	/**
	 * Guarda una nueva noticia en el lista de noticias.
	 * Si el formulario tiene campos vacios, no se guarda la noticia.
	 */
	guardarNoticia(): void {
		this.intentoEnviar.set(true);

		// Si el formulario tiene campos vacios, no se guarda la noticia.
		if (this.formularioInvalido()) {
			return;
		}

		const nuevaNoticia: INoticia = {
			id: this.nextId++,
			titulo: this.titulo().trim(),
			imagen: this.imagen().trim(),
			texto: this.texto().trim(),
			fecha: this.fecha().trim(),
		};

		console.log(nuevaNoticia);
		console.log('Para la próxima noticia nextId ahora vale:', this.nextId);

		this.noticias.update((lista) => [nuevaNoticia, ...lista]);

		// Limpia los campos del formulario y reseteamos intentoEnviar.
		this.titulo.set('');
		this.imagen.set('');
		this.texto.set('');
		this.fecha.set('');
		this.intentoEnviar.set(false);
	}
}
