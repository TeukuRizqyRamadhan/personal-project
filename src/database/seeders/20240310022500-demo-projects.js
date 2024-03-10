'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('projects', [{
      title: "dumbways",
      start: new Date("2024-01-22"),
      end: new Date("2024-01-25"),
      image: "https://github.com/images/modules/search/dark.png",
      content: "cihuy",
      node: true,
      react: true,
      golang: true,
      js: false,
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
