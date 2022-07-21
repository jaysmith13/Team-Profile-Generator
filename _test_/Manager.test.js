const Intern = require('../lib/Manager');

test('creates an manager object', () => {
    const manager = new Manager ('Janea', 90, 'janeasmith@gmail.com',4);
    expect(manager.officeNumber).toEqual(expect.any(Number));
});
test('gets role of employee', () => {
    const manager = new Manager('Janea', 90, 'janeasmith13@gmail.com');
    expect(manager.getRole()).toEqual("Manager");
    });
