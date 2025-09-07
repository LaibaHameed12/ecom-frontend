import * as yup from "yup";
import { PURCHASE_TYPES, DRESS_STYLES, DISCOUNT_TYPES, SIZES, COLORS, GARMENTS } from "../constants/constants";
// ✅ Yup schema
export const CreateProductSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().typeError("Price must be a number").min(0).required(),
    images: yup
        .mixed()
        .test("min-3", "At least 3 images are required", (value) => {
            return value && value.length >= 3;
        }),
    purchaseType: yup
        .array()
        .of(yup.string().oneOf(PURCHASE_TYPES))
        .min(1, "Select at least one purchase type"),
    dressStyle: yup
        .array()
        .of(yup.string().oneOf(DRESS_STYLES))
        .min(1, "Select at least one style"),
    categories: yup
        .array()
        .of(yup.string().oneOf(GARMENTS))
        .min(1, "Select at least one category"),
    variants: yup
        .array()
        .of(
            yup.object().shape({
                size: yup.string().oneOf(SIZES).required(),
                color: yup.string().oneOf(COLORS).required(),
                stock: yup.number().min(0).required(),
            })
        )
        .min(1, "At least one variant is required"),
    // sale: yup.object().shape({
    //     isOnSale: yup.boolean().optional(),
    //     discountType: yup.string().oneOf(DISCOUNT_TYPES).optional(),
    //     discountValue: yup.number().min(0).optional(),
    //     startsAt: yup.date().nullable().optional(),
    //     endsAt: yup.date().nullable().optional(),
    // }),
});
