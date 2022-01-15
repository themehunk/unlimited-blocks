const bounce = {
  title: "Bouncing",
  value: [
    //in
    { title: "Bounce", anim_class: "animate__bounce" },
    { title: "Bounce In Down", anim_class: "animate__bounceInDown" },
    { title: "Bounce In Left", anim_class: "animate__bounceInLeft" },
    { title: "Bounce In Right", anim_class: "animate__bounceInRight" },
    { title: "Bounce In Up", anim_class: "animate__bounceInUp" },
    //out
    { title: "Bounce Out", anim_class: "animate__bounceOut" },
    { title: "Bounce Out Down", anim_class: "animate__bounceOut" },
    { title: "Bounce Out Left", anim_class: "animate__bounceOutLeft" },
    { title: "Bounce Out Right", anim_class: "animate__bounceOutRight" },
    { title: "Bounce Out Up", anim_class: "animate__bounceOutUp" },
  ],
};

const Fade = {
  title: "Fading",
  value: [
    //in
    { title: "Fade In", anim_class: "animate__fadeIn" },
    { title: "Fade In Down", anim_class: "animate__fadeInDown" },
    { title: "Fade In Down Big", anim_class: "animate__fadeInDownBig" },
    { title: "Fade In Left", anim_class: "animate__fadeInLeft" },
    { title: "Fade In Left Big", anim_class: "animate__fadeInLeftBig" },
    { title: "Fade In Right", anim_class: "animate__fadeInRight" },
    { title: "Fade In Right Big", anim_class: "animate__fadeInRightBig" },
    { title: "Fade In Up", anim_class: "animate__fadeInUp" },
    { title: "Fade In Up Big", anim_class: "animate__fadeInUpBig" },
    //out
    { title: "Fade Out", anim_class: "animate__fadeOut" },
    { title: "Fade Out Down", anim_class: "animate__fadeOutDown" },
    { title: "Fade Out Down Big", anim_class: "animate__fadeOutDownBig" },
    { title: "Fade Out Left", anim_class: "animate__fadeOutLeft" },
    { title: "Fade Out Left Big", anim_class: "animate__fadeOutLeftBig" },
    { title: "Fade Out Right", anim_class: "animate__fadeOutRight" },
    { title: "Fade Out Right Big", anim_class: "animate__fadeOutRightBig" },
    { title: "Fade Out Up", anim_class: "animate__fadeOutUp" },
    { title: "Fade Out Up Big", anim_class: "animate__fadeOutUpBig" },
  ],
};

export let animations = [bounce, Fade];
export let AnimationDelay_ = [
  { title: "One Second", anim_class: "animate__delay-1s" },
  { title: "Two Second", anim_class: "animate__delay-2s" },
  { title: "Three Second", anim_class: "animate__delay-3s" },
  { title: "Four Second", anim_class: "animate__delay-4s" },
  { title: "Five Second", anim_class: "animate__delay-5s" },
];
export let AnimationSpeed_ = [
  { title: "Faster", anim_class: "animate__faster" },
  { title: "Fast", anim_class: "animate__fast" },
  { title: "Slow", anim_class: "animate__slow" },
  { title: "Slower", anim_class: "animate__slower" },
];
