/**
 * Install-time prompt for the Quasar App Extension.
 *
 * Lets the user pick which PrimeVue v4 preset to theme Quasar with. The choice
 * is read back in src/index.js to inject the matching stylesheet
 * (`primevue-<theme>.scss`). Defaults to Aura for backwards compatibility.
 *
 * See: https://quasar.dev/app-extensions/development-guide/prompts-api
 */
module.exports = function () {
  return [
    {
      name: 'theme',
      type: 'list',
      message: 'Which PrimeVue v4 theme should Quasar adopt?',
      choices: [
        { name: 'Aura', value: 'aura' },
        { name: 'Material', value: 'material' },
        { name: 'Lara', value: 'lara' },
        { name: 'Nora', value: 'nora' },
      ],
      default: 'aura',
    },
  ];
};
