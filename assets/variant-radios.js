const { VariantSelects } = await import(
    window._resolveImport?.("variant-selects") || "variant-selects"
);

class VariantRadios extends VariantSelects {}

export { VariantRadios };
