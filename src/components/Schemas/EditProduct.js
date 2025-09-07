import * as yup from "yup";
import { PURCHASE_TYPES, DRESS_STYLES, DISCOUNT_TYPES, SIZES, COLORS, GARMENTS } from "../constants/constants";

export const EditProductSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required").min(0),
    images: yup
        .array()
        .test("min-images", "At least 3 images required", function (value) {
            const { existingImages = [] } = this.options.context || {};
            if ((!existingImages || existingImages.length === 0) && (!value || value.length < 3)) {
                return false;
            }
            return true;
        }),
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
    // ...purchaseType, dressStyle, categories validations
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
});
