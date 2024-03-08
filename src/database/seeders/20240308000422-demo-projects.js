'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('projects', [{
      title: 'John Doe',
      image: 'https://sequelize.org/img/logo.svg',
      content: 'wkwkwkjancuk',
      technologyNode: 'fa-brands fa-node fa-2xl',
      technologyReact: 'fa-brands fa-react fa-2xl',
      technologyGolang: 'fa-brands fa-golang fa-2xl',
      technologyJavascript: 'fa-brands fa-js fa-2xl',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
