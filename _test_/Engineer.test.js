const Engineer = require('../lib/Engineer');

test('creates an Engineer object',() => {
    const engineer = new Engineer('Janea', 90, 'janeasmith13@gmail.com', 'janeasmith22');
    expect(engineer.github).toEqual(expect.any(String));
});
test('creates an github value',() => {
    const engineer = new Engineer('Janea', 90, 'janeasmith13@gmail.com', 'janeasmith22');
    expect(engineer.github).toEqual(expect.stringContaining(engineer.github.toString()));
});
test('get role of employee', () =>{
    const engineer = new Engineer('Janea', 90, 'janeasmith13@gmail.com', 'janeasmith22');
    expect(engineer.getRole()).toEqual("Engineer");
 });