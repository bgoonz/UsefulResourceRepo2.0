/*
 *
 * Copyright 2015 gRPC authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
_VERIFIER_INTERNAL_H
#define GRPC_TEST_CORE_END2END_CQ_VERIFIER_INTERNAL_H

#include "test/core/end2end/cq_verifier.h"

typedef struct expectation expectation;

expectation* cq_verifier_get_first_expectation(cq_verifier* v);

void cq_verifier_set_first_expectation(cq_verifier* v, expectation* e);

grpc_event cq_verifier_next_event(cq_verifier* v, int timeout_seconds);

#endif /* GRPC_TEST_CORE_END2END_CQ_VERIFIER_INTERNAL_H */
