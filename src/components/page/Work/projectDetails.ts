import workimg1 from "@/assets/workimg1.webp";
import workimg2 from "@/assets/workimg1.webp";
import workimg3 from "@/assets/workimg1.webp";
import workimg4 from "@/assets/workimg1.webp";
import workimg5 from "@/assets/workimg1.webp";
import workimg6 from "@/assets/workimg1.webp";
import workimg7 from "@/assets/workimg1.webp";
import workimg8 from "@/assets/workimg1.webp";
import workimg9 from "@/assets/workimg1.webp";
import workimg10 from "@/assets/workimg1.webp";
import workimg11 from "@/assets/workimg1.webp";
import workimg12 from "@/assets/workimg1.webp";
import { StaticImageData } from "next/image";

export type ProjectDetail = {
    id: number;
    title: string;
    subtitle: string;
    img: StaticImageData;
};

export const projectDetails: ProjectDetail[] = [
    {
        id: 1,
        title: "Cambium",
        subtitle: "Pioneering Sustainable Solutions",
        img: workimg1,
    },
    {
        id: 2,
        img: workimg2,
        title: "The St.Regis Venice",
        subtitle: "Elegant one-page solution",
    },
    {
        id: 3,
        title: "Pixelflakes",
        subtitle: "Architectural marketing agency",
        img: workimg3,
    },
    {
        id: 4,
        title: "Studio D",
        subtitle: "Urban and Landscape Design",
        img: workimg4,
    },
    {
        id: 5,
        title: "Ali Ali",
        subtitle: "Unique director's portfolio",
        img: workimg5,
    },
    {
        id: 6,
        title: "Plugged Live Shows",
        subtitle: "Custom Made Live Shows",
        img: workimg6,
    },
    {
        id: 7,
        title: "Ali Ali",
        subtitle: "Unique director's portfolio",
        img: workimg7,
    },
    {
        id: 8,
        title: "Cambium",
        subtitle: "Pioneering Sustainable Solutions",
        img: workimg8,
    },
    {
        id: 9,
        title: "Studio D",
        subtitle: "Urban and Landscape Design",
        img: workimg9,
    },
    {
        id: 10,
        title: "Pixelflakes",
        subtitle: "Architectural marketing agency",
        img: workimg10,
    },
    {
        id: 11,
        title: "Cambium",
        subtitle: "Pioneering Sustainable Solutions",
        img: workimg11,
    },
    {
        id: 12,
        title: "Stock Dutch Designs",
        subtitle: "Daring colours & patterns",
        img: workimg12,
    },
];