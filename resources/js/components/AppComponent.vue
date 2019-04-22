<template>
    <div class="container">

    <header>
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-4">
              <h4 class="text-white">Tasks</h4>
              <p class="text-muted">Tasks TODO</p>
            </div>
            <div class="col-sm-4 offset-md-1 py-4">
              <h4 class="text-white">Contact</h4>
              <ul class="list-unstyled">
   
              </ul>
            </div>
          </div>
        </div>
      </div>

    </header>

    <transition name="slide-fade" mode="out-in">
        <router-view></router-view>
    </transition>
    </div>
</template>