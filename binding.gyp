{
  "targets": [],
  "conditions": [
    [
      "OS=='win'",
      {
        "conditions": [
          [
            "target_arch == 'ia32'",
            {
              "variables": {
                "sdk_arch%": "",
                "sdk_arch_path%": "i386"
              }
            }
          ],
          [
            "target_arch == 'x64'",
            {
              "variables": {
                "sdk_arch%": ".x64",
                "sdk_arch_path%": "x64"
              }
            }
          ]
        ],
        "targets": [
          {
            "target_name": "<(module_name)",
            "cflags!": [
              "-fno-exceptions"
            ],
            "cflags_cc!": [
              "-fno-exceptions"
            ],
            "sources": [
              "src/CorsairSdk.cc"
            ],
            "include_dirs": [
              "<!@(node -p \"require('node-addon-api').include\")",
              "<(module_root_dir)/CUESDK/include"
            ],
            "defines": [
              "NAPI_DISABLE_CPP_EXCEPTIONS"
            ],
            "dependencies": [
              "<!(node -p \"require('node-addon-api').gyp\")"
            ],
            "libraries": [
              "<(module_root_dir)/CUESDK/lib/<(sdk_arch_path)/CUESDK<(sdk_arch)_2015.lib"
            ],
            "copies": [
              {
                "destination": "<(module_path)",
                "files": [
                  "<(module_root_dir)/CUESDK/redist/<(sdk_arch_path)/CUESDK<(sdk_arch)_2015.dll"
                ]
              }
            ]
          },
          {
            "target_name": "action_after_build",
            "type": "none",
            "dependencies": [
              "<(module_name)"
            ],
            "copies": [
              {
                "files": [
                  "<(PRODUCT_DIR)/<(module_name).node"
                ],
                "destination": "<(module_path)"
              }
            ]
          }
        ]
      }
    ]
  ]
}