const request = require('supertest');
const app = require('../app');
const Product = require('../models/Product');
require('../models');


let token;
let cartsId;

beforeAll(async() =>{
    const credentials = {
        email: "juan@academlo.com",
        password: "academlo"
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
});

test('POST /carts should create a cart' , async () => {
    const product = await Product.create({   
        title: "SAMSUNG Galaxy Tab S8+ 12.5'",
        description: "SAMSUNG Galaxy Tab S8+ 12.4” 512GB WiFi 6E Android Tablet, Large AMOLED Screen, S Pen Included, Ultra Wide Camera, Long Lasting Battery, US Version, 2022, Graphite",
        brand: "Samsung",
        price: "$ 1250",
        });
    const cart = {
        productsId: product.id,
        quantity: 7
    }
    const res = await request(app)
        .post('/carts')
        .send(cart)
        .set('Authorization', `Bearer ${token}`);
        cartsId = res.body.id;
    await product.destroy();
    cartsId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();    
});

test('GET /carts', async () => { 
    const res = await request(app)
        .get('/carts')
        .set('Authoritation', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /carts/:id', async () => {
    const cartUpdated = {
        quantity: 3
    }
    const res = await request(app)
        .put(`/carts/${cartsId}`)
        .send(cartUpdated)
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.rate).toBe(cartUpdated.rate);
});

test('DELETE /carts/:id', async () => { 
    const res = await request(app)
    .delete(`/carts/${cartsId}`)
    .set('Authorization', `Bearer ${ token }`);
    expect(res.status).toBe(204);
});

