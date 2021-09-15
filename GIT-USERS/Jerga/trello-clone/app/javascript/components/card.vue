<template>
  <div>
    <div class="card app-card" @click="editing=true">
      <div class="card-block">
        <h4 class="card-title"> {{ card.name }} </h4>
      </div>
    </div>
    <div v-if="editing" id="myModal" class="modal" @click="closeModal" style="display: block">
      <div class="modal-content">
        <h5 class="modal-title">{{ card.name }}</h5>
        <div class="modal-body">
          <input v-model="name" class="form-control"></input>
        </div>
        <div class="modal-footer">
          <button @click="save" type="button" class="btn btn-primary">Save changes</button>
          <button @click="editing=false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['card', 'list'],
  data: function() {
    return {
      editing: false,
      name: this.card.name
    }
  },
  methods: {
    closeModal: function(event){
      if (event.target.classList.contains("modal")) {
        this.editing = false;
      }
    },
    save: function() {
      var data = new FormData
      var list = this.list;
      data.append("card[name]", this.name)

      Rails.ajax({
        url: `/cards/${this.card.id}`,
        type: "PATCH",
        data: data,
        dataType: "json",
        beforeSend: () => true,
        success: (data) => {
          this.editing = false
        }
      })
    }
  }
}
</script>

<style scoeped>
  .modal {
    position: fixed; /* Stay in place */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

  /* Modal Content */
  .modal-content {
      background-color: #fefefe;
      margin: auto;
      padding: 20px;
      border: 1px solid #888;
      width: 50%;
  }

  .card {
    box-shadow: 2px 2px 2px rgba(0,0,0,0.3);
  }

  .card-block {
    background-color: white;
  }

  .card-title {
    font-size: 14px;
    font-weight: 400;
  }
</style>
