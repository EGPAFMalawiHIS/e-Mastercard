<template>
  <div>
    <div class="input-group mb-3 rounded">
      <input
        class="form-control border-primary"
        id="myInput"
        type="text"
        placeholder="Search for a patient.."
      />
      <div class="input-group-append">
        <button
          class="btn btn-outline-secondary"
          type="button"
          style="margin-left: 10px"
        >search</button>
      </div>
    </div>
    <div class="justify-content-center" style="width: 80%; margin: auto; margin-left: 60px">
      <form class="form-inline">
        <div class="form-group">
          <label for="gender">Gender:</label>
          <!-- <input type="password" class="form-control" id="pwd"> -->
          <select name="gender" id="gender" class="form-control form-control" >
            <option value selected disabled>Gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </select>
        </div>
        <div class="form-group" style="margin-left: 20px">
          <input
            type="checkbox"
            name="ARV number"
            id="arvNumber"
            value="ARV Number"
          />
          <label class="form-check-input" for="arvNumber">ARV Number</label>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>