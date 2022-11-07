export interface Category{
  id: string;
  name: string;
}
export interface Producto
{
  // Atributos que deberia tener un obj no es una class
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
}
