<template>
  <BootstrapTable :rows="users"
                  :columns="table.columns"
                  :config="table.config"
                  :actions="table.actions"
                  @on-create-user="createUser"
                  class="table table-striped">
    <template slot="roles" slot-scope="props">
      <ul class="roles-list">
        <li v-for="role_object in props.cell_value" :key="role_object.role" class="roles-list-item">
          {{ role_object.role }}
        </li>
      </ul>
    </template>
    <template slot="deactivated_on" slot-scope="props">
      {{ props.cell_value ? moment(pros.cell_value).format('dd/MMM/YYYY') : 'N/A' }}
    </template>
    <template slot="user_id" slot-scope="props">
      <button type="button" @click="() => editUser(props.cell_value)">
        <i class="fas fa-user-edit" aria-hidden="true"></i>
      </button>
      <button type="button" @click="() => deactivateUser(props.cell_value)">
        <span class="fas fa-user-minus" aria-hidden="true"></span>
      </button>
    </template>
  </BootstrapTable>
</template>

<script>
import moment from "moment";
import VueBootstrap4Table from "vue-bootstrap4-table";

export default {
  props: ["users"],
  components: {BootstrapTable: VueBootstrap4Table},
  computed: {
    table_rows: function() {
      return this.users.map(user => ({
        ...user,
        roles: user.roles.map(role => role.role),
      }));
    }
  },
  data() {
    return {
      table: {
        actions: [
          {
            btn_text: 'Add user',
            btn_name: 'Add user',
            event_name: 'on-create-user',
            class: 'btn btn-primary'
          }
        ],
        config: {
          card_title: 'Users',
          global_search: {
            placeholder: 'Search',
            visibility: true
          }
        },
        rows: [],
        columns: [
          {
            label: 'username',
            name: 'username',
            sort: true
          },
          {
            label: 'Given name',
            name: 'given_name',
            sort: true
          },
          {
            label: 'Family name',
            name: 'family_name',
            sort: true
          },
          {
            label: 'Roles',
            name: 'roles',
            sort: false
          },
          {
            label: 'Deactivated on',
            name: 'deactivated_on',
            sort: true
          },
          {
            label: 'Actions',
            name: 'user_id',
            sort: false
          }
        ]
      }
    }
  },
  methods: {
    createUser: function() {
      this.$emit('create-user');
    },
    editUser(userId) {
      this.$emit('edit-user', userId);
    },
    deactivateUser(userId) {
      this.$emit('deactivate-user', userId);
    }
  }
}
</script>

<style scoped>
.roles-list {
  list-style-type: none;
}
</style>
