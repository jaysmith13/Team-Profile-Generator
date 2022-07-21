const Intern = require('../lib/Intern');

test('creates an Intern object', () => {
    const intern = new Intern ('Janea', 90, 'janeasmith@gmail.com','UofU');
    expect(intern.school).toEqual(expect.any(String));
});
test('gets employee school', () => {
    const intern = new Intern('Janea', 90, 'janeasmith13@gmail.com','UofU');
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
    });
test('gets role of employee', () => {
    const intern = new Intern('Janea', 90, 'janeasmith13@gmail.com','UofU');
    expect(intern.getRole()).toEqual("Intern");
});