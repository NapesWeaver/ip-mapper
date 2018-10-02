'use strict';

import { getLocalInfo } from './utils/get-info.js';
import { attachListeners } from './ip-mapper.js';

getLocalInfo();
attachListeners();
$('#start').focus();