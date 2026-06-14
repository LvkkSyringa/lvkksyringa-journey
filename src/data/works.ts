/* ══════════════════════════════════════════════════════════
   数据模型 & 作品
   自动生成自 src/data/exif.json
   ══════════════════════════════════════════════════════════ */

export interface Work {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  itchUrl?: string;
  metadata?: Record<string, string>;
}

export interface Constellation {
  id: string;
  name: string;
  nameCN: string;
  works: Work[];
  cx: number;
  cy: number;
}

/* ── 摄影作品 ── */
const photoWorks: Work[] = 
[
  {
    "id": "photo-202406201",
    "title": "Sweat and Iron 汗与钢铁",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202406201.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/400",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202406202",
    "title": "Golden Brocade 金锦缎",
    "description": "Shanghai, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202406202.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/640",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202406203",
    "title": "Bustling Canvas 画中繁华",
    "description": "Shanghai, China",
    "tags": [
      "Landscape",
      "Street",
      "Portrait"
    ],
    "image": "/images/202406203.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/3.2",
      "Shutter": "1/125",
      "ISO": "800",
      "Focal": "39mm"
    }
  },
  {
    "id": "photo-202407291",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202407291.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/500",
      "ISO": "3200",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202408161",
    "title": "Rising 上升的",
    "description": "Shanghai, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202408161.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/500",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202408191",
    "title": "Finality 终末",
    "description": "Japan",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202408191.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071"
    }
  },
  {
    "id": "photo-202408201",
    "title": "",
    "description": "Japan",
    "tags": [
      "Street",
      "Landscape"
    ],
    "image": "/images/202408201.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/8",
      "Shutter": "1/500",
      "ISO": "100",
      "Focal": "145mm"
    }
  },
  {
    "id": "photo-202408202",
    "title": "",
    "description": "Japan",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202408202.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/400",
      "ISO": "400",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202408211",
    "title": "",
    "description": "Japan",
    "tags": [
      "Landscape",
      "Architecture"
    ],
    "image": "/images/202408211.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/500",
      "ISO": "200",
      "Focal": "169mm"
    }
  },
  {
    "id": "photo-202408221",
    "title": "",
    "description": "Japan",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202408221.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/640",
      "ISO": "100",
      "Focal": "148mm"
    }
  },
  {
    "id": "photo-202408222",
    "title": "",
    "description": "Japan",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202408222.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/320",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202408271",
    "title": "Voyager 远行的孤舟",
    "description": "Japan",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202408271.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071"
    }
  },
  {
    "id": "photo-202408272",
    "title": "",
    "description": "Japan",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202408272.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/4.5",
      "Shutter": "1/100",
      "ISO": "100",
      "Focal": "89mm"
    }
  },
  {
    "id": "photo-202410031",
    "title": "Origin 原初",
    "description": "Ningbo, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202410031.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/2.8",
      "Shutter": "1/800",
      "ISO": "100",
      "Focal": "28mm"
    }
  },
  {
    "id": "photo-202411211",
    "title": "The Last Bird I 最后的飞鸟 I",
    "description": "Shanghai, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202411211.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/2000",
      "ISO": "100",
      "Focal": "191mm"
    }
  },
  {
    "id": "photo-202411212",
    "title": "The Last Bird II 最后的飞鸟 II",
    "description": "Shanghai, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202411212.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/1600",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202411213",
    "title": "The Last Bird III 最后的飞鸟 III",
    "description": "Shanghai, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202411213.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/10",
      "Shutter": "1/640",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202501301",
    "title": "Reflection 折光溢彩",
    "description": "Shanghai, China",
    "tags": [
      "Architecture",
      "Street"
    ],
    "image": "/images/202501301.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/125",
      "ISO": "640",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202502101",
    "title": "",
    "description": "Guangdong, China",
    "tags": [
      "Landscape",
      "Street",
      "Architecture"
    ],
    "image": "/images/202502101.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/80",
      "ISO": "100",
      "Focal": "59mm"
    }
  },
  {
    "id": "photo-202503201",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202503201.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/320",
      "ISO": "100",
      "Focal": "175mm"
    }
  },
  {
    "id": "photo-202503202",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202503202.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202504041",
    "title": "Shape of Wind 风之形",
    "description": "",
    "tags": [
      "Street"
    ],
    "image": "/images/202504041.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/6",
      "ISO": "800",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202505171",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202505171.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/500",
      "ISO": "400",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202505172",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202505172.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/200",
      "ISO": "800",
      "Focal": "162mm"
    }
  },
  {
    "id": "photo-202505173",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202505173.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "28-200mm F2.8-5.6 A071",
      "Aperture": "f/5.6",
      "Shutter": "1/200",
      "ISO": "800",
      "Focal": "189mm"
    }
  },
  {
    "id": "photo-202506051",
    "title": "The Sky Sea 倒悬之海",
    "description": "Shanghai, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506051.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/250",
      "ISO": "100",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506131",
    "title": "Pulse 脉搏",
    "description": "Chongqing, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202506131.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/80",
      "ISO": "800",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506132",
    "title": "",
    "description": "Chongqing, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202506132.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/125",
      "ISO": "1000",
      "Focal": "128mm"
    }
  },
  {
    "id": "photo-202506141",
    "title": "Edge of Sunset I 暮色一线之间 I",
    "description": "Paris, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506141.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/200",
      "ISO": "500",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506142",
    "title": "Edge of Sunset II 暮色一线之间 II",
    "description": "Paris, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506142.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/200",
      "ISO": "800",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506143",
    "title": "Edge of Sunset III 暮色一线之间 III",
    "description": "Paris, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506143.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/250",
      "ISO": "800",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506144",
    "title": "",
    "description": "Paris, France",
    "tags": [
      "Street"
    ],
    "image": "/images/202506144.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/320",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506151",
    "title": "",
    "description": "Manche, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506151.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/8",
      "Shutter": "1/500",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506152",
    "title": "",
    "description": "Etretat, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506152.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/320",
      "ISO": "100",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506153",
    "title": "",
    "description": "Etretat, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506153.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/800",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506154",
    "title": "",
    "description": "Etretat, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506154.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/4",
      "Shutter": "1/1600",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506155",
    "title": "",
    "description": "Etretat, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506155.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/6.3",
      "Shutter": "1/80",
      "ISO": "100",
      "Focal": "127mm"
    }
  },
  {
    "id": "photo-202506156",
    "title": "",
    "description": "Etretat, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506156.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/800",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506157",
    "title": "",
    "description": "Etretat, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506157.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/320",
      "ISO": "640",
      "Focal": "87mm"
    }
  },
  {
    "id": "photo-202506158",
    "title": "",
    "description": "Etretat, France",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506158.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/200",
      "ISO": "100",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506161",
    "title": "",
    "description": "",
    "tags": [
      "Portrait",
      "Street"
    ],
    "image": "/images/202506161.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202506182",
    "title": "Belief on the Peak 山巅的信仰",
    "description": "",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202506182.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G",
      "Aperture": "f/6.3",
      "Shutter": "1/320",
      "ISO": "100",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506190",
    "title": "Eternal Parting 鹊桥",
    "description": "St. Wolfgang, Austria",
    "tags": [
      "Astro"
    ],
    "image": "/images/202506190.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G"
    }
  },
  {
    "id": "photo-202506191",
    "title": "Twilight 暮光",
    "description": "Vienna, Austria",
    "tags": [
      "Portrait",
      "Street"
    ],
    "image": "/images/202506191.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G"
    }
  },
  {
    "id": "photo-202506192",
    "title": "Across the Horizon 落九天",
    "description": "St. Wolfgang, Austria",
    "tags": [
      "Astro"
    ],
    "image": "/images/202506192.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G"
    }
  },
  {
    "id": "photo-202506193",
    "title": "",
    "description": "",
    "tags": [
      "Architecture",
      "Street"
    ],
    "image": "/images/202506193.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/80",
      "ISO": "1250",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506194",
    "title": "",
    "description": "",
    "tags": [
      "Street",
      "Wildlife"
    ],
    "image": "/images/202506194.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/2000",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506195",
    "title": "Falling Destiny 陨落",
    "description": "Vienna, Austria",
    "tags": [
      "Landscape",
      "Street",
      "Architecture"
    ],
    "image": "/images/202506195.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/10",
      "Shutter": "1/2000",
      "ISO": "100",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506196",
    "title": "",
    "description": "",
    "tags": [
      "Architecture"
    ],
    "image": "/images/202506196.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/160",
      "ISO": "2000",
      "Focal": "118mm"
    }
  },
  {
    "id": "photo-202506197",
    "title": "",
    "description": "",
    "tags": [
      "Architecture"
    ],
    "image": "/images/202506197.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/800",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202506201",
    "title": "",
    "description": "Budapest, Hungary",
    "tags": [
      "Street",
      "Architecture"
    ],
    "image": "/images/202506201.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/2.8",
      "Shutter": "1/2500",
      "ISO": "100",
      "Focal": "147mm"
    }
  },
  {
    "id": "photo-202506241",
    "title": "",
    "description": "Cologne, Germany",
    "tags": [
      "Street"
    ],
    "image": "/images/202506241.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G",
      "Aperture": "f/4",
      "Shutter": "1/1000",
      "ISO": "100",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202506242",
    "title": "",
    "description": "Cologne, Germany",
    "tags": [
      "Architecture",
      "Street"
    ],
    "image": "/images/202506242.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G",
      "Aperture": "f/5.6",
      "Shutter": "1/100",
      "ISO": "100",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202508241",
    "title": "Night City 夜之城",
    "description": "Hong Kong, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202508241.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G"
    }
  },
  {
    "id": "photo-202508261",
    "title": "Dolphin 海豚",
    "description": "Guangdong, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202508261.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G",
      "Aperture": "f/4",
      "Shutter": "1/80",
      "ISO": "400",
      "Focal": "70mm"
    }
  },
  {
    "id": "photo-202508271",
    "title": "Breath of the Sky 天空的呼吸",
    "description": "Guangdong, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202508271.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202509081",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202509081.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "SIGMA 150-600mm F5-6.3 DG DN OS",
      "Focal": "600mm"
    }
  },
  {
    "id": "photo-202509082",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202509082.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202509083",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202509083.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202509221",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202509221.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/10",
      "Shutter": "1/320",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202509222",
    "title": "Last Light 末光",
    "description": "Shanghai, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202509222.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Aperture": "f/10",
      "Shutter": "1/8000",
      "ISO": "100",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202512151",
    "title": "Orion 猎户座",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202512151.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G"
    }
  },
  {
    "id": "photo-202512152",
    "title": "Pleiades 昴星团",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202512152.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202512153",
    "title": "Orion Nebula with a Shooting Star 猎户座大星云和流星",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202512153.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202512154",
    "title": "Geminids I 双子座流星雨 I",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202512154.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G"
    }
  },
  {
    "id": "photo-202512155",
    "title": "Orion Nebula  猎户座大星云",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202512155.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202512156",
    "title": "Geminids II 双子座流星雨 II",
    "description": "Shanghai, China",
    "tags": [
      "Astro"
    ],
    "image": "/images/202512156.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 20-70mm F4 G"
    }
  },
  {
    "id": "photo-202602231",
    "title": "Vast and Vague 浩渺晚舟",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602231.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602232",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602232.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602233",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602233.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602234",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602234.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602235",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Street",
      "Portrait"
    ],
    "image": "/images/202602235.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602236",
    "title": "Journey to the Stars 通向群星的旅途",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602236.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202602237",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602237.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202602238",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602238.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602239",
    "title": "Arrow 箭矢",
    "description": "Fujian, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202602239.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602241",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Street",
      "Portrait"
    ],
    "image": "/images/202602241.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602242",
    "title": "Sea of Memories 记忆的海",
    "description": "Fujian, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202602242.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202602243",
    "title": "",
    "description": "Fujian, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202602243.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202603151",
    "title": "",
    "description": "Macao, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202603151.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202603152",
    "title": "",
    "description": "Macao, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202603152.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202603153",
    "title": "",
    "description": "Macao, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202603153.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202603154",
    "title": "Through 穿越",
    "description": "Macao, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202603154.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202603155",
    "title": "Circle of Life1轮回1",
    "description": "Macao, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202603155.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202603156",
    "title": "Circle of Life2轮回2",
    "description": "Macao, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202603156.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202603157",
    "title": "",
    "description": "Macao, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202603157.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202603158",
    "title": "",
    "description": "Macao, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202603158.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202603159",
    "title": "Sing of Life 生之歌",
    "description": "Macao, China",
    "tags": [
      "Wildlife"
    ],
    "image": "/images/202603159.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202603161",
    "title": "",
    "description": "Macao, China",
    "tags": [
      "Landscape",
      "Street"
    ],
    "image": "/images/202603161.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202603162",
    "title": "Crossed Space 交错的空间",
    "description": "Macao, China",
    "tags": [
      "Architecture",
      "Street"
    ],
    "image": "/images/202603162.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Main 24mm",
      "Aperture": "f/1.8",
      "Shutter": "1/64",
      "ISO": "100",
      "Focal": "24mm"
    }
  },
  {
    "id": "photo-202604011",
    "title": "Glassy Blossom 琉璃花",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202604011.jpg",
    "metadata": {
      "Camera": "Sony ILCE-7M4",
      "Lens": "FE 70-200mm F2.8 GM II"
    }
  },
  {
    "id": "photo-202605031",
    "title": "",
    "description": "Jiangsu, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202605031.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Tele 100mm",
      "Aperture": "f/2.8",
      "Shutter": "1/639",
      "ISO": "25",
      "Focal": "200mm"
    }
  },
  {
    "id": "photo-202605032",
    "title": "",
    "description": "Jiangsu, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202605032.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Tele 100mm",
      "Aperture": "f/2.8",
      "Shutter": "1/638",
      "ISO": "32",
      "Focal": "100mm"
    }
  },
  {
    "id": "photo-202605033",
    "title": "",
    "description": "Jiangsu, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202605033.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Tele 100mm",
      "Aperture": "f/2.8",
      "Shutter": "1/573",
      "ISO": "50",
      "Focal": "100mm"
    }
  },
  {
    "id": "photo-202605034",
    "title": "",
    "description": "Jiangsu, China",
    "tags": [
      "Landscape"
    ],
    "image": "/images/202605034.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Ultra Wide 14mm",
      "Aperture": "f/2.2",
      "Shutter": "1/481",
      "ISO": "16",
      "Focal": "14mm"
    }
  },
  {
    "id": "photo-202605061",
    "title": "Waves 波浪",
    "description": "Shanghai, China",
    "tags": [
      "Architecture",
      "Street"
    ],
    "image": "/images/202605061.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Tele 100mm",
      "Aperture": "f/2.8",
      "Shutter": "1/129",
      "ISO": "50",
      "Focal": "100mm"
    }
  },
  {
    "id": "photo-202605111",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202605111.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Main 24mm",
      "Aperture": "f/1.8",
      "Shutter": "1/664",
      "ISO": "64",
      "Focal": "24mm"
    }
  },
  {
    "id": "photo-202605151",
    "title": "Desolate 荒萋旧殿",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202605151.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Ultra Wide 14mm",
      "Aperture": "f/2.2",
      "Shutter": "1/700",
      "ISO": "16",
      "Focal": "14mm"
    }
  },
  {
    "id": "photo-202606071",
    "title": "Night Fair 夜市",
    "description": "Liaoning, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202606071.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Tele 100mm",
      "Aperture": "f/2.8",
      "Shutter": "1/25",
      "ISO": "320",
      "Focal": "100mm"
    }
  },
  {
    "id": "photo-202606091",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street",
      "Architecture"
    ],
    "image": "/images/202606091.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Tele 100mm",
      "Aperture": "f/2.8",
      "Shutter": "1/1730",
      "ISO": "16",
      "Focal": "100mm"
    }
  },
  {
    "id": "photo-202606051",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202606051.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Main 48mm",
      "Aperture": "f/1.8",
      "Shutter": "1/40",
      "ISO": "500",
      "Focal": "48mm"
    }
  },
  {
    "id": "photo-202606151",
    "title": "",
    "description": "Shanghai, China",
    "tags": [
      "Street"
    ],
    "image": "/images/202606151.jpg",
    "metadata": {
      "Camera": "iPhone 17 Pro",
      "Lens": "Tele 100mm",
      "Aperture": "f/2.8",
      "Shutter": "1/93",
      "ISO": "400",
      "Focal": "100mm"
    }
  }
]
;

/* ── 游戏作品 ── */
const gameWorks: Work[] = [
  {
    id: "game-1",
    title: "Vafi",
    description: "Find the colors you lost.",
    tags: ["3D", "Adventure", "Mystery"],
    image: "/logos/vafi.png",
    itchUrl: "https://lvkksyringa.itch.io/vafi",
    metadata: { Engine: "Godot" },
  },
  {
    id: "game-2",
    title: "What's Under the Mask?",
    description: "Go pairing the blocks!",
    tags: ["2D", "Pixels", "Puzzle"],
    image: "/logos/whatsunderthemask.png",
    itchUrl: "https://lvkksyringa.itch.io/underthemask",
    metadata: { Engine: "Godot" },
  },
  {
    id: "game-3",
    title: "After Light",
    description: "What did you lose? What do you still recall?",
    tags: ["2D", "Pixels", "Plot"],
    image: "/logos/afterlight.png",
    metadata: { Engine: "Godot" },
  },
];


/* ── 星座定义 ── */
export const constellations: Constellation[] = [
  {
    id: "photo",
    name: "Photography",
    nameCN: "摄影",
    works: photoWorks,
    cx: 0.28,
    cy: 0.45,
  },
  {
    id: "game",
    name: "Game Design",
    nameCN: "游戏设计",
    works: gameWorks,
    cx: 0.72,
    cy: 0.52,
  },
];

export function getTags(constellationId: string): string[] {
  const c = constellations.find((c) => c.id === constellationId);
  if (!c) return [];
  return [...new Set(c.works.flatMap((w) => w.tags))];
}
