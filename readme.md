https://github.com/sidwyn/solana-pay-wordpress/assets/103864/cd0a420e-3a11-4f68-a115-8475d2cbc107

## Solana Pay Wordpress Plugin

This is a proof of concept for running Solana Pay on Wordpress / WooCommerce.

It is currently in development. NOT ready for production unless you're ready to mess around.

## Adding The Plugin

To add the plugin to your WooCommerce store:

1. Browse to the plugins page. Should look like https://{YOUR_STORE}/wp-admin/plugins.php
2. Install npm dependencies
3. Build the zip: `npm run zip`
4. Upload the zip file as a plugin and activate it.

## Wordpress vs Shopify

Why build this plugin for Wordpress instead of Shopify? Well a couple of reasons:

1. Wordpress is open-source.
2. There's already a Solana Pay shopify integration at https://solanapay.com.
3. Shopify Pay required partners to be approved to build payment apps. I believe there's some [revenue share](https://shopify.dev/docs/apps/payments/requirements#revenue-share) with Shopify going on.

If the point of Solana is to reduce payment processing fees, why pay Shopify's revenue share?

## License

Apache License 2.0
