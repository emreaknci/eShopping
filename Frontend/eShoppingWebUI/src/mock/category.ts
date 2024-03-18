import { faker } from '@faker-js/faker';

export interface Category {
  id: string;
  name: string;
  subcategories: string[];
  products: Product[];
  features: CategoryFeature[];
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  rating: number;
  features: ProductFeature[];
  comments: Comment[];
  images: string[];
}

export interface CategoryFeature {
  name: string;
  values: string[];
}

export interface ProductFeature {
  name: string;
  value: string;
}

export interface Comment {
  userName: string;
  rating: number;
  comment: string;
}


const createFakeCategories = (categoryCount: number, productsPerCategory: number): Category[] => {
  const categories: Category[] = [];

  for (let i = 0; i < categoryCount; i++) {
    const category: Category = {
      id: faker.string.uuid(),
      name: faker.commerce.department(),
      subcategories: faker.random.words(3).split(' '),
      products: [],
      features: []
    };
    // Generate random features for the category
    const numCategoryFeatures = faker.number.int({ min: 1, max: 5 });
    for (let k = 0; k < numCategoryFeatures; k++) {
      const featureName = faker.commerce.productMaterial();
      const featureValues = faker.lorem.words(faker.number.int({ min: 1, max: 5 })).split(' ');
      category.features.push({ name: featureName, values: featureValues });
    }

    for (let j = 0; j < productsPerCategory; j++) {
      const product: Product = {
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: faker.number.int({ min: 10, max: 1000 }),
        description: faker.lorem.paragraph(),
        rating: 0,
        features: [],
        comments: [],
        images: Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => faker.image.urlPicsumPhotos())
      };

      for (let k = 0; k < category.features.length; k++) {
        const feature = category.features[k];
        const valueIndex = faker.number.int({ min: 0, max: feature.values.length - 1 });
        product.features.push({ name: feature.name, value: feature.values[valueIndex] });
      }

      const numComments = faker.number.int({ min: 0, max: 10 });
      for (let k = 0; k < numComments; k++) {
        const comment: Comment = {
          userName: faker.internet.userName(),
          rating: faker.number.int({ min: 1, max: 5 }),
          comment: faker.lorem.sentences(3)
        };

        product.comments.push(comment);
      }
      product.rating = product.comments.reduce((acc, comment) => acc + comment.rating, 0) / product.comments.length;

      category.products.push(product);
    }



    categories.push(category);
  }

  return categories;
};

const categories = createFakeCategories(5, 10);
export default categories;