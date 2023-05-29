'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('disabilities', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      disability: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.createTable('skills', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      skillName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      fullName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      profilePhotoUrl: {
        type: Sequelize.STRING,
        allowNull: false
      },
      disabilityId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'disabilities', // Nama tabel yang menjadi referensi
          key: 'id' // Nama kolom yang menjadi referensi
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      phoneNumber: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });

    await queryInterface.addConstraint('users', {
      fields: ['disabilityId'],
      type: 'foreign key',
      name: 'fk_users_disabilityId',
      references: {
        table: 'disabilities',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.createTable('skillUser', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      skillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'skills',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    await queryInterface.addConstraint('skillUser', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_skillUser_userId',
      references: {
        table: 'users',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });

    await queryInterface.addConstraint('skillUser', {
      fields: ['skillId'],
      type: 'foreign key',
      name: 'fk_skillUser_skillId',
      references: {
        table: 'skills',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.dropTable('skillUser');
    await queryInterface.dropTable('disabilities');
    await queryInterface.dropTable('skills');
    await queryInterface.dropTable('users');
  }
};
