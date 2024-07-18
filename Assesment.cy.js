describe('API Testing', () => {
    
    const baseUrl = 'https://demo.com';
  
    //To send GET request and validate response code
    it('Should send GET request and validate response code', () => {
      cy.request({
        method: 'GET', 
        url:`${baseUrl}/test`,
    }).then((response) => {
            expect(response.status).to.eq(200)
        });
    });
  
    //To send POST request with JSON body and validate response contains relevant data
    it('Should send POST request with JSON body and validate response contains relevant data', () => {
        cy.request({
        method: 'POST', 
        url:`${baseUrl}/test`,
        body: {
        Employee1: 'Kishore',
        Employee2: 'Steve'
        }
    }).then((response) => {
          expect(response.status).to.eq(200);
          assert.equal(response.body.Value[0]["Employee1"], 'Kishore')
        });
    });
  
    //To validate request with delayed response
    it('Should validate request with delayed response', () => { 
      cy.request({
        method: 'GET', 
        url:`${baseUrl}/test`
    }).then((response) => {
          cy.wait(5000);
          expect(response.status).to.eq(200);
        });
    });
  
    //To handle a negative scenario
    it('Should handle a negative scenario', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/test/${invalidUrl}`,
        failOnStatusCode: false 
      }).then((response) => {
          expect(response.status).to.eq(404);
        });
    });
  
    //To simulate unauthorized access
    it('Should simulate unauthorized access', () => {
      cy.request({
        method: 'GET',
        url: `${baseUrl}/test/${unauthorizedUser}`,
        failOnStatusCode: false 
      })
        .then((response) => {
          expect(response.status).to.eq(401);
        });
    });
  });