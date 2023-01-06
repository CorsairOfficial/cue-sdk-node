#include <napi.h>
#include <iCUESDK.h>

Napi::ThreadSafeFunction *tsfnCorsairConnect;
Napi::Object corsairConnect(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);

  if (info.Length() < 1 || !info[0].IsFunction())
  {
    const auto err = CorsairConnect(nullptr, nullptr);
    result["error"] = (int)err;
    return result;
  }

  const auto jsCallback = info[0].As<Napi::Function>();

  if (tsfnCorsairConnect != nullptr)
  {
    tsfnCorsairConnect->Abort();
    tsfnCorsairConnect = nullptr;
  }

  tsfnCorsairConnect = new Napi::ThreadSafeFunction();
  *tsfnCorsairConnect = Napi::ThreadSafeFunction::New(env, jsCallback, "CorsairConnect", 0, 1);

  auto cCallback = [](void *context, const CorsairSessionStateChanged *eventData)
  {
    auto callback = [](Napi::Env env, Napi::Function f, CorsairSessionStateChanged *value)
    {
      auto clientVersion = Napi::Object::New(env);
      clientVersion["major"] = value->details.clientVersion.major;
      clientVersion["minor"] = value->details.clientVersion.minor;
      clientVersion["patch"] = value->details.clientVersion.patch;

      auto serverVersion = Napi::Object::New(env);
      serverVersion["major"] = value->details.serverVersion.major;
      serverVersion["minor"] = value->details.serverVersion.minor;
      serverVersion["patch"] = value->details.serverVersion.patch;

      auto serverHostVersion = Napi::Object::New(env);
      serverHostVersion["major"] = value->details.serverHostVersion.major;
      serverHostVersion["minor"] = value->details.serverHostVersion.minor;
      serverHostVersion["patch"] = value->details.serverHostVersion.patch;

      auto details = Napi::Object::New(env);
      details["clientVersion"] = clientVersion;
      details["serverVersion"] = serverVersion;
      details["serverHostVersion"] = serverHostVersion;

      auto data = Napi::Object::New(env);
      data["state"] = (int)value->state;
      data["details"] = details;

      auto evt = Napi::Object::New(env);
      evt["data"] = data;

      delete value;

      f.Call({evt});
    };

    CorsairSessionStateChanged *payload = new CorsairSessionStateChanged();
    payload->state = eventData->state;
    payload->details = eventData->details;

    tsfnCorsairConnect->BlockingCall(payload, callback);
  };

  const auto err = CorsairConnect(cCallback, nullptr);
  if (err != CorsairError::CE_Success)
  {
    tsfnCorsairConnect->Release();
    tsfnCorsairConnect = nullptr;
  }

  result["error"] = (int)err;
  return result;
}

Napi::Object corsairGetSessionDetails(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  CorsairSessionDetails details;
  auto err = CorsairGetSessionDetails(&details);

  auto clientVersion = Napi::Object::New(env);
  clientVersion["major"] = details.clientVersion.major;
  clientVersion["minor"] = details.clientVersion.minor;
  clientVersion["patch"] = details.clientVersion.patch;

  auto serverVersion = Napi::Object::New(env);
  serverVersion["major"] = details.serverVersion.major;
  serverVersion["minor"] = details.serverVersion.minor;
  serverVersion["patch"] = details.serverVersion.patch;

  auto serverHostVersion = Napi::Object::New(env);
  serverHostVersion["major"] = details.serverHostVersion.major;
  serverHostVersion["minor"] = details.serverHostVersion.minor;
  serverHostVersion["patch"] = details.serverHostVersion.patch;

  auto data = Napi::Object::New(env);
  data["clientVersion"] = clientVersion;
  data["serverVersion"] = serverVersion;
  data["serverHostVersion"] = serverHostVersion;

  result["error"] = (int)err;
  result["data"] = data;

  return result;
}

Napi::Object corsairDisconnect(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto err = CorsairDisconnect();
  result["error"] = (int)err;
  return result;
}

Napi::Object corsairGetDevices(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto options = info[0].As<Napi::Object>();

  CorsairDeviceFilter filter;
  filter.deviceTypeMask = options.Get("deviceTypeMask").As<Napi::Number>().Int32Value();
  CorsairDeviceInfo *devices = new CorsairDeviceInfo[CORSAIR_DEVICE_COUNT_MAX];
  int size = 0;
  auto err = CorsairGetDevices(&filter, CORSAIR_DEVICE_COUNT_MAX, devices, &size);
  result["error"] = (int)err;

  if (err != CorsairError::CE_Success)
  {
    result["data"] = env.Null();
    return result;
  }

  auto data = Napi::Array::New(env);
  for (int i = 0; i < size; i++)
  {
    auto elem = Napi::Object::New(env);
    elem["type"] = (int)devices[i].type;
    elem["id"] = std::string(devices[i].id);
    elem["serial"] = std::string(devices[i].serial);
    elem["model"] = std::string(devices[i].model);
    elem["ledCount"] = (int)devices[i].ledCount;
    elem["channelCount"] = (int)devices[i].channelCount;
    data[(uint32_t)i] = elem;
  }

  delete devices;

  result["data"] = data;
  return result;
}

Napi::Object corsairGetDeviceInfo(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto id = info[0].As<Napi::String>().Utf8Value();

  CorsairDeviceInfo deviceInfo;
  auto err = CorsairGetDeviceInfo(id.c_str(), &deviceInfo);
  result["error"] = (int)err;

  if (err != CorsairError::CE_Success)
  {
    result["data"] = env.Null();
    return result;
  }

  auto data = Napi::Object::New(env);
  data["type"] = (int)deviceInfo.type;
  data["id"] = std::string(deviceInfo.id);
  data["serial"] = std::string(deviceInfo.serial);
  data["model"] = std::string(deviceInfo.model);
  data["ledCount"] = (int)deviceInfo.ledCount;
  data["channelCount"] = (int)deviceInfo.channelCount;

  result["data"] = data;
  return result;
}

Napi::Object corsairGetLedPositions(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto id = info[0].As<Napi::String>().Utf8Value();

  CorsairLedPosition *positions = new CorsairLedPosition[CORSAIR_DEVICE_LEDCOUNT_MAX];
  int size = 0;
  auto err = CorsairGetLedPositions(id.c_str(), CORSAIR_DEVICE_LEDCOUNT_MAX, positions, &size);
  result["error"] = (int)err;

  if (err != CorsairError::CE_Success)
  {
    result["data"] = env.Null();
    return result;
  }

  auto data = Napi::Array::New(env);
  for (int i = 0; i < size; i++)
  {
    auto elem = Napi::Object::New(env);
    elem["id"] = (int)positions[i].id;
    elem["cx"] = positions[i].cx;
    elem["cy"] = positions[i].cy;
    data[(uint32_t)i] = elem;
  }

  delete positions;

  result["data"] = data;
  return result;
}

Napi::ThreadSafeFunction *tsfnCorsairSubscribeForEvents;
Napi::Object corsairSubscribeForEvents(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);

  if (info.Length() < 1 || !info[0].IsFunction())
  {
    const auto err = CorsairSubscribeForEvents(nullptr, nullptr);
    result["error"] = (int)err;
    return result;
  }

  const auto jsCallback = info[0].As<Napi::Function>();

  if (tsfnCorsairSubscribeForEvents != nullptr)
  {
    tsfnCorsairSubscribeForEvents->Abort();
    tsfnCorsairSubscribeForEvents = nullptr;
  }

  tsfnCorsairSubscribeForEvents = new Napi::ThreadSafeFunction();
  *tsfnCorsairSubscribeForEvents = Napi::ThreadSafeFunction::New(env, jsCallback, "CorsairSubscribeForEvents", 0, 1);

  auto cCallback = [](void *context, const CorsairEvent *event)
  {
    auto callback = [](Napi::Env env, Napi::Function f, CorsairEvent *value)
    {
      auto data = Napi::Object::New(env);
      data["id"] = (int)value->id;
      if (value->id == CorsairEventId::CEI_KeyEvent)
      {
        data["deviceId"] = std::string(value->keyEvent->deviceId);
        data["keyId"] = (int)value->keyEvent->keyId;
        data["isPressed"] = value->keyEvent->isPressed;
      }
      else if (value->id == CorsairEventId::CEI_DeviceConnectionStatusChangedEvent)
      {
        data["deviceId"] = std::string(value->deviceConnectionStatusChangedEvent->deviceId);
        data["isConnected"] = value->deviceConnectionStatusChangedEvent->isConnected;
      }

      auto evt = Napi::Object::New(env);
      evt["data"] = data;

      delete value;

      f.Call({evt});
    };

    CorsairEvent *ev = new CorsairEvent();
    ev->id = event->id;
    if (ev->id == CEI_KeyEvent)
    {
      auto ke = new CorsairKeyEvent();
      ke->keyId = event->keyEvent->keyId;
      ke->isPressed = event->keyEvent->isPressed;
      strncpy(ke->deviceId, event->keyEvent->deviceId, CORSAIR_STRING_SIZE_M);
      ev->keyEvent = ke;
    }
    else if (ev->id == CEI_DeviceConnectionStatusChangedEvent)
    {
      auto de = new CorsairDeviceConnectionStatusChangedEvent();
      de->isConnected = event->deviceConnectionStatusChangedEvent->isConnected;
      strncpy(de->deviceId, event->deviceConnectionStatusChangedEvent->deviceId, CORSAIR_STRING_SIZE_M);
      ev->deviceConnectionStatusChangedEvent = de;
    }

    tsfnCorsairSubscribeForEvents->BlockingCall(ev, callback);
  };

  const auto err = CorsairSubscribeForEvents(cCallback, nullptr);
  if (err != CorsairError::CE_Success)
  {
    tsfnCorsairSubscribeForEvents->Release();
    tsfnCorsairSubscribeForEvents = nullptr;
  }

  result["error"] = (int)err;
  return result;
}

Napi::Object corsairUnsubscribeFromEvents(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);

  const auto err = CorsairUnsubscribeFromEvents();
  if (tsfnCorsairSubscribeForEvents != nullptr)
  {
    tsfnCorsairSubscribeForEvents->Abort();
    tsfnCorsairSubscribeForEvents = nullptr;
  }

  result["error"] = (int)err;
  return result;
}

Napi::Object corsairConfigureKeyEvent(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto id = info[0].As<Napi::String>().Utf8Value();
  auto options = info[1].As<Napi::Object>();
  CorsairKeyEventConfiguration config;
  config.keyId = static_cast<CorsairMacroKeyId>(options.Get("keyId").As<Napi::Number>().Int32Value());
  config.isIntercepted = options.Get("isIntercepted").As<Napi::Boolean>();

  auto err = CorsairConfigureKeyEvent(id.c_str(), &config);
  result["error"] = (int)err;
  return result;
}

Napi::Object corsairSetLedColors(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto id = info[0].As<Napi::String>().Utf8Value();
  auto colors = info[1].As<Napi::Array>();
  auto len = colors.Length();
  CorsairLedColor *ledsColors = new CorsairLedColor[len]();
  for (size_t i = 0; i < len; i++)
  {
    auto c = colors.Get(i).As<Napi::Object>();
    CorsairLedColor led = {
        static_cast<CorsairLedLuid>(c.Get("id").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("r").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("g").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("b").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("a").As<Napi::Number>().Int32Value())};
    ledsColors[i] = led;
  }

  const auto err = CorsairSetLedColors(id.c_str(), len, ledsColors);

  delete[] ledsColors;

  result["error"] = (int)err;
  return result;
}

Napi::Object corsairSetLedColorsBuffer(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto id = info[0].As<Napi::String>().Utf8Value();
  auto colors = info[1].As<Napi::Array>();
  auto len = colors.Length();
  CorsairLedColor *ledsColors = new CorsairLedColor[len]();
  for (size_t i = 0; i < len; i++)
  {
    auto c = colors.Get(i).As<Napi::Object>();
    CorsairLedColor led = {
        static_cast<CorsairLedLuid>(c.Get("id").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("r").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("g").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("b").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("a").As<Napi::Number>().Int32Value())};
    ledsColors[i] = led;
  }

  const auto err = CorsairSetLedColorsBuffer(id.c_str(), len, ledsColors);

  delete[] ledsColors;

  result["error"] = (int)err;
  return result;
}

Napi::ThreadSafeFunction tsfnCorsairSetLedColorsFlushBufferAsync;
Napi::Object corsairSetLedColorsFlushBufferAsync(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);

  if (info.Length() < 1 || !info[0].IsFunction())
  {
    const auto err = CorsairSetLedColorsFlushBufferAsync(nullptr, nullptr);
    result["error"] = (int)err;
    return result;
  }

  const auto jsCallback = info[0].As<Napi::Function>();
  tsfnCorsairSetLedColorsFlushBufferAsync = Napi::ThreadSafeFunction::New(env, jsCallback, "CorsairSetLedColorsFlushBufferAsync", 0, 1);
  auto cCallback = [](void *context, CorsairError error)
  {
    auto callback = [](Napi::Env env, Napi::Function f, int *value)
    {
      f.Call({Napi::Number::New(env, *value)});
      delete value;
    };

    int *value = new int(error);
    tsfnCorsairSetLedColorsFlushBufferAsync.BlockingCall(value, callback);
    tsfnCorsairSetLedColorsFlushBufferAsync.Release();
  };

  const auto err = CorsairSetLedColorsFlushBufferAsync(cCallback, nullptr);
  if (err == CorsairError::CE_Success)
  {
    tsfnCorsairSetLedColorsFlushBufferAsync.Release();
  }

  result["error"] = (int)err;
  return result;
}

Napi::Object corsairGetLedColors(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto id = info[0].As<Napi::String>().Utf8Value();
  auto colors = info[1].As<Napi::Array>();
  auto len = colors.Length();
  CorsairLedColor *ledsColors = new CorsairLedColor[len]();
  for (size_t i = 0; i < len; i++)
  {
    auto c = colors.Get(i).As<Napi::Object>();
    CorsairLedColor led = {
        static_cast<CorsairLedLuid>(c.Get("id").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("r").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("g").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("b").As<Napi::Number>().Int32Value()),
        static_cast<unsigned char>(c.Get("a").As<Napi::Number>().Int32Value())};
    ledsColors[i] = led;
  }

  auto err = CorsairGetLedColors(id.c_str(), len, ledsColors);
  if (err == CorsairError::CE_Success)
  {
    for (size_t i = 0; i < len; i++)
    {
      CorsairLedColor led = ledsColors[i];
      auto c = colors.Get(i).As<Napi::Object>();
      c["id"] = (int)led.id;
      c["r"] = led.r;
      c["g"] = led.g;
      c["b"] = led.b;
      c["a"] = led.a;
    }
  }

  delete[] ledsColors;

  result["error"] = (int)err;
  return result;
}

Napi::Object corsairSetLayerPriority(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  const auto priority = info[0].As<Napi::Number>().Uint32Value();
  const auto err = CorsairSetLayerPriority(priority);
  result["error"] = (int)err;
  return result;
}

Napi::Object corsairGetLedLuidForKeyName(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  auto id = info[0].As<Napi::String>().Utf8Value();
  const auto keyName = info[1].As<Napi::String>().Utf8Value()[0];
  CorsairLedLuid ledId;
  const auto err = CorsairGetLedLuidForKeyName(id.c_str(), keyName, &ledId);
  result["error"] = (int)err;
  if (err == CorsairError::CE_Success)
  {
    auto data = Napi::Object::New(env);
    data["ledLuid"] = (int)ledId;
    result["data"] = data;
  }

  return result;
}

Napi::Object corsairRequestControl(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  const auto id = info[0].As<Napi::String>().Utf8Value();
  const auto accessLevel = static_cast<CorsairAccessLevel>(info[1].As<Napi::Number>().Int32Value());
  auto err = CorsairRequestControl(id.c_str(), accessLevel);
  result["error"] = (int)err;
  return result;
}

Napi::Object corsairReleaseControl(const Napi::CallbackInfo &info)
{
  const auto env = info.Env();
  auto result = Napi::Object::New(env);
  const auto id = info[0].As<Napi::String>().Utf8Value();
  auto err = CorsairReleaseControl(id.c_str());
  result["error"] = (int)err;
  return result;
}

Napi::Object Init(Napi::Env env, Napi::Object exports)
{
  exports["CorsairConnect"] = Napi::Function::New(env, corsairConnect);
  exports["CorsairGetSessionDetails"] = Napi::Function::New(env, corsairGetSessionDetails);
  exports["CorsairDisconnect"] = Napi::Function::New(env, corsairDisconnect);

  exports["CorsairGetDevices"] = Napi::Function::New(env, corsairGetDevices);
  exports["CorsairGetDeviceInfo"] = Napi::Function::New(env, corsairGetDeviceInfo);

  exports["CorsairGetLedPositions"] = Napi::Function::New(env, corsairGetLedPositions);

  exports["CorsairSubscribeForEvents"] = Napi::Function::New(env, corsairSubscribeForEvents);
  exports["CorsairUnsubscribeFromEvents"] = Napi::Function::New(env, corsairUnsubscribeFromEvents);
  exports["CorsairConfigureKeyEvent"] = Napi::Function::New(env, corsairConfigureKeyEvent);

  // exports["CorsairGetDevicePropertyInfo"] = Napi::Function::New(env, corsairGetDevicePropertyInfo);
  // exports["CorsairReadDeviceProperty"] = Napi::Function::New(env, corsairReadDeviceProperty);
  // exports["CorsairWriteDeviceProperty"] = Napi::Function::New(env, corsairWriteDeviceProperty);
  // exports["CorsairFreeProperty"] = Napi::Function::New(env, corsairFreeProperty);

  exports["CorsairSetLedColors"] = Napi::Function::New(env, corsairSetLedColors);
  exports["CorsairSetLedColorsBuffer"] = Napi::Function::New(env, corsairSetLedColorsBuffer);
  exports["CorsairSetLedColorsFlushBufferAsync"] = Napi::Function::New(env, corsairSetLedColorsFlushBufferAsync);
  exports["CorsairGetLedColors"] = Napi::Function::New(env, corsairGetLedColors);
  exports["CorsairSetLayerPriority"] = Napi::Function::New(env, corsairSetLayerPriority);
  exports["CorsairGetLedLuidForKeyName"] = Napi::Function::New(env, corsairGetLedLuidForKeyName);
  exports["CorsairRequestControl"] = Napi::Function::New(env, corsairRequestControl);
  exports["CorsairReleaseControl"] = Napi::Function::New(env, corsairReleaseControl);

  return exports;
}

NODE_API_MODULE(cue_sdk, Init)