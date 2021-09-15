#!/usr/bin/env node
var _ = require('lodash'),
jobs = require('../config/crons');

// start all jobs
_.invoke(jobs, 'start');