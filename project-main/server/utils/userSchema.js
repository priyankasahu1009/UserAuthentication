export default {
  users: {
    columns: {
      id: {
        name: 'id',
        type: 'INT',
        auto_increment: true,
        primary_key: true,
      },
      username: {
        name: 'username',
        type: 'VARCHAR(255)',
        not_null: true,
        unique: true,
      },
      password: {
        name: 'password',
        type: 'VARCHAR(255)',
        not_null: true,
      },
      email: { 
        name: 'email',
        type: 'VARCHAR(255)',
        not_null: true,
        unique: true,
      },
      company_name: { 
        name: 'company_name',
        type: 'VARCHAR(255)',
        not_null: true,
      },
    },
  },
};
