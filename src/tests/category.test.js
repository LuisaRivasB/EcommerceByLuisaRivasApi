const request = require('supertest');
const app = require ('../app');

let token;
let categoryId;

beforeAll(async() => {
    const credentials = {
        email: "juan@academlo.com",
        password: "academlo",
    }
    const res = await request(app).post('/users/login').send(credentials);
    token = res.body.token;
})

test('POST /categories should create one category ', async () => {
    const category = {
        name: "Tablet"
    }
    const res = await request(app)
        .post('/categories')
        .send(category)
        .set('Authorization', `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
});

test('GET /categories', async () => {
    const res = await request(app)
        .get('/categories')
        .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test('PUT /categories/:id', async () => {
    const categoriesUpdated = {
        name: "Tablets"
    }
    const res = await request(app)
        .put(`/categories/${categoryId}`)
        .send(categoriesUpdated)
        .set('Authorization', `Bearer ${ token }`);;
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(categoriesUpdated.name);    
});


test('DELETE /categories/:id', async () => { 
    const res = await request(app)
    .delete(`/categories/${categoryId}`)
    .set('Authorization', `Bearer ${ token }`);;
    expect(res.status).toBe(204);
});