process.env.Node_ENV ="test";
const request = require("supertest");

const app = require("./app");
const items = require('./fakeDb');

beforeEach(function()
{
  items.push({name: "popsicle", price: 1.45});
  items.push({name:"cheerios", price: 3.40});
});

afterEach(function(){
  items.length =0;
});

describe("DELETE /items/:name", function() {
 
  test("Deletes a single item", async function() {
       const resp = await request(app).delete(`/items/cheerios`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({message: "Deleted"});
  });
}); 



describe("get /items",function (){

  test("Gets a list of items",async()=>{
    const resp = await request(app).get("/items");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual([ {
        name: "popsicle",
        price: 1.45
      },
      {
        name: "cheerios",
        price: 3.4
      }
    ])
  })

  test("Gets an item",async()=>{
    const resp = await request(app).get("/items/popsicle");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual( {
      item: {
        name: "popsicle",
        price: 1.45
      }
    })
  })



});



describe("PATCH /items/:name", function() {
  test("Updates a single item", async function() {
    const resp = await request(app)
      .patch(`/items/popsicle`)
      .send({
        name: "BlueBerry",
        price: 200
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      "updated": {
        name: "BlueBerry",
        price: 200
      }
    });
  });

  test("Responds with 404 if id invalid", async function() {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});

describe("POST /items", function() {
  test("Creates a new item", async function() {
    const resp = await request(app)
      .post(`/items`)
      .send({
        name: "Blueberry",
        price: 300
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({added: {name: "Blueberry", price: 300  }});
  });
});