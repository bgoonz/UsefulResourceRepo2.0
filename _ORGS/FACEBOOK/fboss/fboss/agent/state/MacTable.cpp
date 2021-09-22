/*
 *  Copyright (c) 2004-present, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 *
 */
#include "fboss/agent/state/MacTable.h"
#include "fboss/agent/state/NodeMap-defs.h"
#include "fboss/agent/state/NodeMapDelta-defs.h"
#include "fboss/agent/state/SwitchState.h"

namespace facebook::fboss {

MacTable::MacTable() {}

MacTable::~MacTable() {}

MacTable* MacTable::modify(Vlan** vlan, std::shared_ptr<SwitchState>* state) {
  if (!isPublished()) {
    CHECK(!(*state)->isPublished());
    return this;
  }

  *vlan = (*vlan)->modify(state);
  auto newMacTable = clone();
  auto* ptr = newMacTable.get();
  (*vlan)->setMacTable(std::move(newMacTable));

  return ptr;
}

MacTable* MacTable::modify(VlanID vlanID, std::shared_ptr<SwitchState>* state) {
  if (!isPublished()) {
    CHECK(!(*state)->isPublished());
    return this;
  }

  auto vlanPtr = (*state)->getVlans()->getVlan(vlanID).get();
  return modify(&vlanPtr, state);
}

void MacTable::updateEntry(
    folly::MacAddress mac,
    PortDescriptor portDescr,
    std::optional<cfg::AclLookupClass> classID,
    std::optional<MacEntryType> type) {
  CHECK(!this->isPublished());
  auto& nodes = this->writableNodes();
  auto it = nodes.find(mac);
  if (it == nodes.end()) {
    throw FbossError("Mac entry for ", mac.toString(), " does not exist");
  }
  auto entry = it->second->clone();

  entry->setMac(mac);
  entry->setPort(portDescr);
  entry->setClassID(classID);
  if (type) {
    entry->setType(type.value());
  }
  it->second = entry;
}

FBOSS_INSTANTIATE_NODE_MAP(MacTable, MacTableTraits);

} // namespace facebook::fboss
