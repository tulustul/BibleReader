import {bootstrap}    from "angular2/platform/browser";
import {ROUTER_PROVIDERS} from "angular2/router";

import {BibleComponent} from "./bible.component";
import {TranslationsService} from "./translations/translations.service";

bootstrap(BibleComponent, [ROUTER_PROVIDERS, TranslationsService]);
