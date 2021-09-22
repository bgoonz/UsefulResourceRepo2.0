/**
 * Copyright (c) 2015-present, Facebook, Inc. All rights reserved.
 * <p>
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 * <p>
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 * <p>
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */
package com.facebook.ads.sdk.serverside.utils;

import com.facebook.ads.sdk.serverside.GenderEnum;
import com.facebook.ads.sdk.serverside.UserData;
import com.facebook.ads.utils.ServerSideApiConstants;
import com.google.common.hash.Hashing;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.junit.Test;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class HashedListAdaptorTest {

    // An Json string generated by a valid UserData object
    private static String TEST_USERDATA_JSON =
            "{\"em\":[\"971fa2e631db2a508b3fc6ed98016d354e61ecf0d41268e8ab6396771233d293\"," +
                    "\"e0ed81aaa6c505a9f092006a1c003bbbc9cc1a4217f680bd2cf0ad1c0e75f1a2\"]," +
                    "\"ph\":[\"f38efdf3dfb7613ef59f418f9f1ee962f5723a2df4a1a777b18640a4b601e70a\"," +
                    "\"c775e7b757ede630cd0aa1113bd102661ab38829ca52a6422ab782862f268646\"]," +
                    "\"db\":[\"2fa0f121daa18de5cdf751c1e6eb5b79ad30358364fff2deb63d7f2b855865de\"," +
                    "\"2aafd9f6473d474b422c6cf0c4f037c8ff70ad57ff2005e357ee6ae41962827e\"]," +
                    "\"ln\":[\"6fcc735c8b6b9b19495a608fca8ed482f8f5e182291d3b0b554d64d38143ef8d\"," +
                    "\"00f2762d0ba69e640d229e494452f0e8c9f48b0bf06b0a42eb0f70f80ca23ab3\"]," +
                    "\"fn\":[\"fb8cadeff69ef2d8892e70f3a73e44053f591b088bf39746abc3f010a51c236a\"," +
                    "\"9bac3d4a9280b010183652fe7bb7955658540288388e30d0c2f96de79e7c4ec7\"]," +
                    "\"ct\":[\"402eed114f0a583fb72bce76196539c9a25688cc8840c7fa44d54f811ac5ea32\"," +
                    "\"3151a8f227c0e11fd9a7fd1aa24ebfee734503dea095c22c3b2fae09d62eeb25\"]," +
                    "\"st\":[\"6959097001d10501ac7d54c0bdb8db61420f658f2922cc26e46d536119a31126\"," +
                    "\"87b810070b7c739690268360ea392429368787010a558a1837643058d2437dce\"]," +
                    "\"zp\":[\"71082274a5670724fc25f3294c678d98c0b8486de5fecea7b44174e0270400e3\"," +
                    "\"ad67516c42fbd8a0607f60478db0f19a29373e2cb6681eca54b8ac9c4a4628c2\"]," +
                    "\"country\":[\"6959097001d10501ac7d54c0bdb8db61420f658f2922cc26e46d536119a31126\"," +
                    "\"79adb2a2fce5c6ba215fe5f27f532d4e7edbac4b6a5e09e1ef3a08084a904621\"]," +
                    "\"external_id\":[\"9175e8c9956a3560587fe7b45f9f7bc7216522a6cc1dd1bbf7aa4a01ec11e950\"," +
                    "\"dbd99967c9d90662dbff6fe2458a6bf0e8594090234dc0900874977ae55e3f7b\"]}\n";

    @Test
    public void testSerializationAndDedup() {
        Gson gson = new Gson();
        List<String> emails = Arrays.asList("joe@email.com", "smith@eg.com", "smith@eg.com");
        List<String> phones = Arrays.asList("1234567890", "2062062006", "2062062006");
        List<GenderEnum> genders = Arrays.asList(GenderEnum.MALE, GenderEnum.FEMALE, GenderEnum.FEMALE);
        List<String> datesOfBirth = Arrays.asList("20000101", "20000102", "20000102");
        List<String> lastNames = Arrays.asList("lastname-1", "lastname-2", "lastname-2");
        List<String> firstNames = Arrays.asList("firstname-2", "firstname-3", "firstname-3");
        List<String> cities = Arrays.asList("seattle", "sanfrancisco", "seattle");
        List<String> zipcodes = Arrays.asList("98123", "98122", "98122");
        List<String> states = Arrays.asList("wa", "ca", "wa");
        List<String> countryCodes = Arrays.asList("us", "ca", "ca");
        List<String> externalIds = Arrays.asList("external-1", "external-2", "external-2");
        UserData userData = new UserData();
        userData
                .emails(emails)
                .phones(phones)
                .genders(genders)
                .datesOfBirth(datesOfBirth)
                .lastNames(lastNames)
                .firstNames(firstNames)
                .cities(cities)
                .zipcodes(zipcodes)
                .states(states)
                .countryCodes(countryCodes)
                .externalIds(externalIds);

        String actualJson = gson.toJson(userData);
        JsonObject jsonObject = new Gson().fromJson(actualJson, JsonObject.class);
        assertListsEqual(sha256StringList(emails.subList(0, 2)), jsonObject.get(ServerSideApiConstants.EMAIL).getAsJsonArray());
        assertListsEqual(sha256StringList(phones.subList(0, 2)), jsonObject.get(ServerSideApiConstants.PHONE_NUMBER).getAsJsonArray());
        assertListsEqual(sha256GenderList(genders.subList(0, 2)), jsonObject.get(ServerSideApiConstants.GENDER).getAsJsonArray());
        assertListsEqual(sha256StringList(datesOfBirth.subList(0, 2)), jsonObject.get(ServerSideApiConstants.DATE_OF_BIRTH).getAsJsonArray());
        assertListsEqual(sha256StringList(lastNames.subList(0, 2)), jsonObject.get(ServerSideApiConstants.LAST_NAME).getAsJsonArray());
        assertListsEqual(sha256StringList(firstNames.subList(0, 2)), jsonObject.get(ServerSideApiConstants.FIRST_NAME).getAsJsonArray());
        assertListsEqual(sha256StringList(cities.subList(0, 2)), jsonObject.get(ServerSideApiConstants.CITY).getAsJsonArray());
        assertListsEqual(sha256StringList(zipcodes.subList(0, 2)), jsonObject.get(ServerSideApiConstants.ZIP_CODE).getAsJsonArray());
        assertListsEqual(sha256StringList(states.subList(0, 2)), jsonObject.get(ServerSideApiConstants.STATE).getAsJsonArray());
        assertListsEqual(sha256StringList(countryCodes.subList(0, 2)), jsonObject.get(ServerSideApiConstants.COUNTRY).getAsJsonArray());
        assertListsEqual(externalIds.subList(0, 2), jsonObject.get(ServerSideApiConstants.EXTERNAL_ID).getAsJsonArray());
    }

    @Test
    public void testSerializationWithNullValues() {
        Gson gson = new Gson();
        List<String> emails = Arrays.asList("joe@email.com", "smith@eg.com", null);
        List<String> phones = Arrays.asList("1234567890", "2062062006", null);
        List<GenderEnum> genders = Arrays.asList(GenderEnum.MALE, GenderEnum.FEMALE, null);
        List<String> datesOfBirth = Arrays.asList("20000101", "20000102", null);
        List<String> lastNames = Arrays.asList("lastname-1", "lastname-2", null);
        List<String> firstNames = Arrays.asList("firstname-2", "firstname-3", null);
        List<String> cities = Arrays.asList("seattle", "sanfrancisco", null);
        List<String> zipcodes = Arrays.asList("98123", "98122", null);
        List<String> states = Arrays.asList("wa", "ca", null);
        List<String> countryCodes = Arrays.asList("us", "ca", null);
        List<String> externalIds = Arrays.asList("external-1", "external-2", null);
        UserData userData = new UserData();
        userData
                .emails(emails)
                .phones(phones)
                .genders(genders)
                .datesOfBirth(datesOfBirth)
                .lastNames(lastNames)
                .firstNames(firstNames)
                .cities(cities)
                .zipcodes(zipcodes)
                .states(states)
                .countryCodes(countryCodes)
                .externalIds(externalIds);

        String actualJson = gson.toJson(userData);
        JsonObject jsonObject = new Gson().fromJson(actualJson, JsonObject.class);
        assertListsEqual(sha256StringList(emails.subList(0, 2)), jsonObject.get(ServerSideApiConstants.EMAIL).getAsJsonArray());
        assertListsEqual(sha256StringList(phones.subList(0, 2)), jsonObject.get(ServerSideApiConstants.PHONE_NUMBER).getAsJsonArray());
        assertListsEqual(sha256GenderList(genders.subList(0, 2)), jsonObject.get(ServerSideApiConstants.GENDER).getAsJsonArray());
        assertListsEqual(sha256StringList(datesOfBirth.subList(0, 2)), jsonObject.get(ServerSideApiConstants.DATE_OF_BIRTH).getAsJsonArray());
        assertListsEqual(sha256StringList(lastNames.subList(0, 2)), jsonObject.get(ServerSideApiConstants.LAST_NAME).getAsJsonArray());
        assertListsEqual(sha256StringList(firstNames.subList(0, 2)), jsonObject.get(ServerSideApiConstants.FIRST_NAME).getAsJsonArray());
        assertListsEqual(sha256StringList(cities.subList(0, 2)), jsonObject.get(ServerSideApiConstants.CITY).getAsJsonArray());
        assertListsEqual(sha256StringList(zipcodes.subList(0, 2)), jsonObject.get(ServerSideApiConstants.ZIP_CODE).getAsJsonArray());
        assertListsEqual(sha256StringList(states.subList(0, 2)), jsonObject.get(ServerSideApiConstants.STATE).getAsJsonArray());
        assertListsEqual(sha256StringList(countryCodes.subList(0, 2)), jsonObject.get(ServerSideApiConstants.COUNTRY).getAsJsonArray());
        assertListsEqual(externalIds.subList(0, 2), jsonObject.get(ServerSideApiConstants.EXTERNAL_ID).getAsJsonArray());
    }

    @Test
    public void testDeserialization(){
        Gson gson = new Gson();
        UserData actualUserData = gson.fromJson(TEST_USERDATA_JSON, UserData.class);
        assertEquals(actualUserData.getEmails().size(), 2);
        assertEquals(actualUserData.getPhones().size(), 2);
        assertEquals(actualUserData.getDatesOfBirth().size(), 2);
        assertEquals(actualUserData.getLastNames().size(), 2);
        assertEquals(actualUserData.getFirstNames().size(), 2);
        assertEquals(actualUserData.getCities().size(), 2);
        assertEquals(actualUserData.getStates().size(), 2);
        assertEquals(actualUserData.getZipcodes().size(), 2);
        assertEquals(actualUserData.getCountryCodes().size(), 2);
        assertEquals(actualUserData.getExternalIds().size(), 2);
    }

    /**
     * Assert helper to check the actual Json value of user data fields equals the expected value.
     */
    private void assertListsEqual(List<String> expected, JsonArray actualJsonArray) {
        List<String> actual = jsonArrayToList(actualJsonArray);
        assertTrue(actual.size() == expected.size() && expected.containsAll(actual) && actual.containsAll(expected));
    }

    /**
     * Hash a given list of strings, using the same hashing function as in production.
     */
    private List<String> sha256StringList(List<String> list) {
        List<String> result = new ArrayList<String>();
        for (String s : list) {
            result.add(Hashing.sha256().hashString(s, StandardCharsets.UTF_8).toString());
        }
        return result;
    }

    /**
     * Hash a given list of GenderEnum, using the same hashing function as in production.
     */
    private List<String> sha256GenderList(List<GenderEnum> list) {
        List<String> result = new ArrayList<String>();
        for (GenderEnum ge : list) {
            result.add(Hashing.sha256().hashString(ge.toString(), StandardCharsets.UTF_8).toString());
        }
        return result;
    }

    /**
     * Convert a JsonArray to list of strings
     */
    private List<String> jsonArrayToList(JsonArray jsonArray) {
        int len = jsonArray.size();
        List<String> res = new ArrayList();
        for (int i = 0; i < len; i++) {
            res.add(jsonArray.get(i).toString().replace("\"", ""));
        }
        return res;
    }
}
