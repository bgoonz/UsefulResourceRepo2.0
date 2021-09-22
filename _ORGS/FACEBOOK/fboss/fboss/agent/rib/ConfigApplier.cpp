/*
 *  Copyright (c) 2004-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */

#include "fboss/agent/rib/ConfigApplier.h"
#include "fboss/agent/rib/ForwardingInformationBaseUpdater.h"
#include "fboss/agent/rib/RouteUpdater.h"
#include "fboss/agent/rib/RoutingInformationBase.h"

#include <algorithm>

namespace facebook::fboss {

ConfigApplier::ConfigApplier(
    RouterID vrf,
    IPv4NetworkToRouteMap* v4NetworkToRoute,
    IPv6NetworkToRouteMap* v6NetworkToRoute,
    folly::Range<DirectlyConnectedRouteIterator> directlyConnectedRouteRange,
    folly::Range<StaticRouteNoNextHopsIterator> staticCpuRouteRange,
    folly::Range<StaticRouteNoNextHopsIterator> staticDropRouteRange,
    folly::Range<StaticRouteWithNextHopsIterator> staticRouteRange,
    folly::Range<StaticIp2MplsRouteIterator> staticIp2MplsRouteRange)
    : vrf_(vrf),
      v4NetworkToRoute_(v4NetworkToRoute),
      v6NetworkToRoute_(v6NetworkToRoute),
      directlyConnectedRouteRange_(directlyConnectedRouteRange),
      staticCpuRouteRange_(staticCpuRouteRange),
      staticDropRouteRange_(staticDropRouteRange),
      staticRouteRange_(staticRouteRange),
      staticIp2MplsRouteRange_(staticIp2MplsRouteRange) {
  CHECK_NOTNULL(v4NetworkToRoute_);
  CHECK_NOTNULL(v6NetworkToRoute_);
}

void ConfigApplier::apply() {
  RibRouteUpdater updater(v4NetworkToRoute_, v6NetworkToRoute_);

  // Update static routes
  std::vector<RibRouteUpdater::RouteEntry> staticRoutes;
  staticRoutes.reserve(
      staticCpuRouteRange_.size() + staticDropRouteRange_.size() +
      staticRouteRange_.size());
  auto fillInStaticRoutes = [this, &staticRoutes](
                                const auto& routeRange, const auto& nhopFn) {
    for (const auto& staticRoute : routeRange) {
      if (RouterID(*staticRoute.routerID_ref()) != vrf_) {
        continue;
      }
      auto prefix = folly::IPAddress::createNetwork(*staticRoute.prefix_ref());
      staticRoutes.push_back({prefix, nhopFn(staticRoute)});
    }
  };
  fillInStaticRoutes(staticCpuRouteRange_, [](const auto& /*route*/) {
    return RouteNextHopEntry::createToCpu();
  });
  fillInStaticRoutes(staticDropRouteRange_, [](const auto& /*route*/) {
    return RouteNextHopEntry::createDrop();
  });
  fillInStaticRoutes(staticRouteRange_, [](const auto& route) {
    return RouteNextHopEntry::fromStaticRoute(route);
  });
  fillInStaticRoutes(staticIp2MplsRouteRange_, [](const auto& route) {
    return RouteNextHopEntry::fromStaticIp2MplsRoute(route);
  });
  // Update link local routes
  std::vector<RibRouteUpdater::RouteEntry> linkLocalRoutes;
  if (!directlyConnectedRouteRange_.empty()) {
    // Add link-local routes
    RouteNextHopEntry nextHop(
        RouteForwardAction::TO_CPU, AdminDistance::DIRECTLY_CONNECTED);
    linkLocalRoutes.push_back({{folly::IPAddress{"fe80::"}, 64}, nextHop});
  }

  // Update interface routes
  std::vector<RibRouteUpdater::RouteEntry> interfaceRoutes;
  for (const auto& directlyConnectedRoute : directlyConnectedRouteRange_) {
    auto network = directlyConnectedRoute.first;
    auto interfaceID = directlyConnectedRoute.second.first;
    auto address = directlyConnectedRoute.second.second;
    ResolvedNextHop resolvedNextHop(address, interfaceID, UCMP_DEFAULT_WEIGHT);
    RouteNextHopEntry nextHop(
        resolvedNextHop, AdminDistance::DIRECTLY_CONNECTED);
    interfaceRoutes.push_back({network, nextHop});
  }
  updater.update(
      {{ClientID::STATIC_ROUTE, staticRoutes},
       {ClientID::LINKLOCAL_ROUTE, linkLocalRoutes},
       {ClientID::INTERFACE_ROUTE, interfaceRoutes}},
      {},
      {ClientID::STATIC_ROUTE,
       ClientID::LINKLOCAL_ROUTE,
       ClientID::INTERFACE_ROUTE});
}

} // namespace facebook::fboss
