// src/lib/data.ts

export interface LibraryItem {
  id: string;
  title: string;
  author: string;
  category: string;
  type: string;
  imageId: string;
  pdfUrl?: string; // Campo opcional para la URL del PDF
}

export const habits = [
  { id: '1', title: 'Meditación Matutina', description: '5 minutos de meditación mindfulness.', active: true },
  { id: '2', title: 'Escribir Diario', description: 'Escribir una página sobre tus pensamientos.', active: true },
  { id: '3', title: 'Caminata de 15 min', description: 'Un paseo corto para despejar la mente.', active: false },
  { id: '4', title: 'Leer un capítulo', description: 'Avanzar en tu libro actual.', active: true },
  { id: '5', title: 'Beber 2L de agua', description: 'Mantenerse hidratado durante el día.', active: true },
];

export const libraryItems: LibraryItem[] = [
  { id: 'lib4', title: 'Cómo hacer que te pasen cosas buenas', author: 'Marian Rojas Estapé', category: 'Energía', type: 'Texto', imageId: 'library_4', pdfUrl: 'https://drive.google.com/file/d/1u_ADqyD7qX5dT_RnXikoEQ5CZmLzVURz/preview' },
  { id: 'lib3', title: 'Deja de ser tú', author: 'Joe Dispenza', category: 'Reflexión', type: 'Texto', imageId: 'library_3', pdfUrl: 'https://drive.google.com/file/d/1NozvPxM_yUNXOPhAId8VQfMkUgaTPbk-/preview' },
  { id: 'lib1', title: 'El sutil arte de que (no) te importe nada', author: 'Mark Manson', category: 'Reflexión', type: 'Texto', imageId: 'library_1', pdfUrl: 'https://drive.google.com/file/d/11xYHzM3Mwo2H5d0a4dqjFlvDWWlLMRHg/preview' },
  { id: 'lib2', title: 'El poder del ahora', author: 'Eckhart Tolle', category: 'Calma', type: 'Texto', imageId: 'library_2', pdfUrl: 'https://drive.google.com/file/d/14YWSX216mVu_mbOmnvpEQ3s4lA2MmKM6/preview' },
  { id: 'lib14', title: 'Hábitos Atómicos', author: 'James Clear', category: 'Energía', type: 'Texto', imageId: 'library_14', pdfUrl: 'https://drive.google.com/file/d/1ZCbG-a_-AyQMcNG3uHkaMaMQdhGtrG5b/preview' },
  { id: 'lib5', title: 'Inteligencia Emocional', author: 'Daniel Goleman', category: 'Reflexión', type: 'Texto', imageId: 'library_5', pdfUrl: 'https://drive.google.com/file/d/1KSbPIY568mkmyk38KnqSTKS75h5RSy0l/preview' },
  { id: 'lib6', title: 'Las 48 leyes del poder', author: 'Robert Greene', category: 'Reflexión', type: 'Texto', imageId: 'library_6', pdfUrl: 'https://drive.google.com/file/d/1kJAkcNGzcYFefCyOXH0IgnHkxH7RUjER/preview' },
  { id: 'lib7', title: 'Los secretos de la mente millonaria', author: 'T. Harv Eker', category: 'Energía', type: 'Texto', imageId: 'library_7', pdfUrl: 'https://drive.google.com/file/d/1JL09dxA0GwFYeUpw91VXjM31L3_u_uLo/preview' },
  { id: 'lib10', title: 'Mañanas milagrosas', author: 'Hal Elrod', category: 'Energía', type: 'Texto', imageId: 'library_10', pdfUrl: 'https://drive.google.com/file/d/1vDq4LzEUa1qUY7dxepUSU9Huf2ge2MmB/preview' },
  { id: 'lib12', title: 'Meditaciones', author: 'Marco Aurelio', category: 'Calma', type: 'Texto', imageId: 'library_12', pdfUrl: 'https://drive.google.com/file/d/1aS7ju3ScIwiZWfKW_JqfJ3Cn2bOljfeF/preview' },
  { id: 'lib8', title: 'Padre rico, padre pobre', author: 'Robert T. Kiyosaki', category: 'Energía', type: 'Texto', imageId: 'library_8', pdfUrl: 'https://drive.google.com/file/d/1fGfhKFV3_3BkLH746Bh493_wgzKIR1zU/preview' },
  { id: 'lib13', title: 'Poder sin límites', author: 'Tony Robbins', category: 'Energía', type: 'Texto', imageId: 'library_13', pdfUrl: 'https://drive.google.com/file/d/1CYLcYq7yvCnA5zpBBQEKXO7RwBKIczV6/preview' },
  { id: 'lib9', title: 'Psicología oscura', author: 'Steven Turner', category: 'Reflexión', type: 'Texto', imageId: 'library_9', pdfUrl: 'https://drive.google.com/file/d/1w_kZci4WBG0y714ljlzTDwkAaq2dxaSv/preview' },
  { id: 'lib11', title: 'Tus zonas erróneas', author: 'Wayne Dyer', category: 'Reflexión', type: 'Texto', imageId: 'library_11', pdfUrl: 'https://drive.google.com/file/d/1ljBxvzJCXNlhJmQMoRXdWQbmmqOquasv/preview' },
];

export const moodHistory = [
  { date: '2024-07-01', mood: 'Feliz', value: 5 },
  { date: '2024-07-02', mood: 'Pensativo', value: 3 },
  { date: '2024-07-03', mood: 'Feliz', value: 5 },
  { date: '2024-07-04', mood: 'Cansado', value: 2 },
  { date: '2024-07-05', mood: 'Estresado', value: 1 },
  { date: '2024-07-06', mood: 'Calmado', value: 4 },
  { date: '2024-07-07', mood: 'Feliz', value: 5 },
];

export const habitProgress = [
    { name: 'Semana 1', 'Meditación': 80, 'Lectura': 90, 'Ejercicio': 60 },
    { name: 'Semana 2', 'Meditación': 70, 'Lectura': 85, 'Ejercicio': 75 },
    { name: 'Semana 3', 'Meditación': 90, 'Lectura': 95, 'Ejercicio': 80 },
    { name: 'Semana 4', 'Meditación': 85, 'Lectura': 92, 'Ejercicio': 88 },
];

export const achievements = [
    { id: 'ach1', title: 'Primera Racha', description: 'Completaste 3 días seguidos.', icon: 'Flame' },
    { id: 'ach2', title: 'Lector Voraz', description: 'Terminaste 5 lecturas.', icon: 'BookMarked' },
    { id: 'ach3', title: 'Mente Clara', description: 'Meditaste por 7 días.', icon: 'BrainCircuit' },
    { id: 'ach4', title: 'Explorador Emocional', description: 'Registraste 10 estados de ánimo.', icon: 'Smile' },
]
