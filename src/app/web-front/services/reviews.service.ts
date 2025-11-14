import { Injectable } from '@angular/core';
import type { Review } from '@front/interfaces/review.interface';

const reviews: Review[] = [
  {
    author: 'Mariana Ledesma',
    title: 'Crítica Gastronómica',
    text: 'Una experiencia impecable de principio a fin. Cada plato es una obra de arte que sorprende por su armonía y delicadeza.',
  },
  {
    author: 'Sebastián Duarte',
    title: 'Chef Ejecutivo',
    text: 'La técnica y el respeto por el producto son admirables. Todo está cuidado al detalle: sabores precisos, texturas perfectas y servicio excepcional.',
  },
  {
    author: 'Elena Rivas',
    title: 'Gastrónoma',
    text: 'Una propuesta culinaria elegante y profundamente equilibrada. La combinación de sabores y la atmósfera hacen de cada visita un momento memorable.',
  },
];

@Injectable({ providedIn: 'root' })
export class ReviewsService {
  getAllReviews(): Review[] {
    return [...reviews];
  }
}
