<template>
  <v-card
    height="415px"
    style="z-index: 0"
    class="elevation-0"
  >
    <v-navigation-drawer
      class="pb-0"
      permanent
      absolute
      height="100%"
      light
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <v-layout
            row
            v-if="item.heading"
            align-center
            :key="i"
          > 
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group v-else-if="item.children" v-model="item.model" no-action>
            <v-list-tile slot="item" > 
              <v-list-tile-action>
                <v-icon class="purple--text" >{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
              </v-list-tile-action >
              <v-list-tile-content class="purple--text">
                <v-list-tile-title >
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon" >
                <v-icon class="purple--text">{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title >
                 <router-link class="purple--text" :to="child.go" v-text="child.text"></router-link> 
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else>
            <v-list-tile-action>
              <v-icon class="purple--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
                 <router-link class="purple--text" :to="item.go" v-text="item.text"></router-link> 
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>


<script>
export default {
  name: "my-header",
  data: function data() {
    return {
      items: [
            { 
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Alunos',
          model: true,
          children: [
            { icon: 'add', text: 'Novo',go: '/dashboard/students/create' },
            { icon: 'view_list', text: 'Listar', go: '/dashboard/students'},
            { icon: 'fingerprint', text: 'Ponto', go: '/dashboard/points'},
            { icon: 'notes', text: 'Notas', go: '!#'}
          ]
        },
        { icon: 'class', text: 'Turma', go: '/dashboard/classes' },
        { icon: 'content_copy', text: 'Disciplinas', go: '#' },
  
        {
          icon: 'keyboard_arrow_up',
          'icon-alt': 'keyboard_arrow_down',
          text: 'Professor' ,
          model: false,
          children: [
            { text: 'Import', go: '#' },
            { text: 'Export', go: '#'},
            { text: 'Print', go: '#' },
          ]
        },
        { icon: 'settings', text: 'Configurações', go: '#' }
      ]
    }

  }
}
</script>
<style>

a {
  text-decoration: none;
}
</style>
