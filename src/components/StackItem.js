const iconModule = import.meta.glob('../assets/icons/*', {
  eager: true,
  import: 'default',
});

function extractDominantColor(url) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const size = 50;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, size, size);
      const data = ctx.getImageData(0, 0, size, size).data;

      let r = 0,
        g = 0,
        b = 0,
        count = 0;

      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }

      if (count > 0) {
        resolve(`
          rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)},)
        `);
      } else {
        resolve('#888888');
      }
    };
    img.onerror = () => resolve('#888888');
    img.src = url;
  });
}

export default {
  emits: ['dontlike', 'lock'],
  props: {
    title: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
    },
    locked: {
      type: Boolean,
      default: false,
    },
  },
  name: 'stack-item',
  data() {
    return {
      color: '#000000',
    };
  },
  methods: {
    getIcon(pic) {
      const imageBody = iconModule[`../assets/icons/${pic}`] || '';
      if (imageBody) {
        extractDominantColor(imageBody).then((color) => (this.color = color));
      }
      return imageBody;
    },
  },
};
