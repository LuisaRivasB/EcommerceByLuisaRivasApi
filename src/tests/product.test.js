const request = require ('supertest');
const app = require ('../app');
const Category = require('../models/Category');
const ProductImg = require('../models/ProductImg');
require('../models');

let token;
let productsId;

beforeAll(async() => {
    const credentials = {
        email: "juan@academlo.com",
        password: "academlo",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /products should create a products' , async () => {
    const category = await Category.create({ name: "tech" });
    const product = {
        title: "SAMSUNG Galaxy Tab S8+ 12.4'",
        description: "SAMSUNG Galaxy Tab S8+ 12.4” 512GB WiFi 6E Android Tablet, Large AMOLED Screen, S Pen Included, Ultra Wide Camera, Long Lasting Battery, US Version, 2022, Graphite",
        brand: "Samsung",
        price: "$ 1250",
        categoryId: category.id
    }
    const res = await request(app)
        .post('/products')
        .send(product)
        .set('Authorization', `Bearer ${token}`);
    productsId = res.body.id;
    await category.destroy();
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();    
});

test('GET /products', async () => { 
    const res = await request(app).get('/products');
    expect(res.status).toBe(200);
    console.log(res)
    expect(res.body).toHaveLength(1);
});

test('PUT /products/:id', async () => {
    const productsUpdated = {
        price: "$ 1200"
    }
    const res = await request(app)
        .put(`/products/${productsId}`)
        .send(productsUpdated)
        .set('Authorization', `Bearer ${ token }`);;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(productsUpdated.name);    
});

test('GET /products/:id', async () => { 
    const res = await request(app).get(`/products/${productsId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productsId);
});

test('POST /products/:id/images should set the products images', async () => {
    const image = await ProductImg.create({
        url:"http://falseurl.com",
        publicId: "false id",
    })
    const res = await request(app)
        .post(`/products/${productsId}/images`)  
        .send([image.id]);
    await image.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
})

test('DELETE /products/:id', async () => { 
    const res = await request(app)
    .delete(`/products/${productsId}`)
    .set('Authorization', `Bearer ${ token }`);
    expect(res.status).toBe(204);
});