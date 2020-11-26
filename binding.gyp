{
  "variables": {
    "module_name%": "cuesdk",
    "win_prebuild_path%": "<(module_root_dir)/prebuilds/win32-<(target_arch)"
  },
  "targets": [
    {
      "target_name": "<(module_name)",
      "sources": [
        "src/CorsairSdk.cc"
      ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<(module_root_dir)/CUESDK/include"
      ],
      "cflags!": [
        "-fno-exceptions"
      ],
      "cflags_cc!": [
        "-fno-exceptions"
      ],
      "defines": [
        "NAPI_DISABLE_CPP_EXCEPTIONS"
      ],
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
            "libraries": [
              "<(module_root_dir)/CUESDK/lib/<(sdk_arch_path)/CUESDK<(sdk_arch)_2017.lib"
            ],
            "copies": [
              {
                "destination": "<(win_prebuild_path)",
                "files": [
                  "<(module_root_dir)/CUESDK/redist/<(sdk_arch_path)/CUESDK<(sdk_arch)_2017.dll"
                ]
              }
            ]
          }
        ],
        [
          "OS=='mac'",
          {
            "libraries": [
              "<(module_root_dir)/CUESDK/mac/CUESDK.dylib",
              "-Wl,-rpath,<(module_root_dir)"
            ],
            "link_settings": {
              "libraries": [
                "-Wl,-rpath,@loader_path",
                "-Wl,-rpath,@loader_path/.."
              ]
            }
          }
        ]
      ]
    },
    {
      "target_name": "action_before_build",
      "type": "none",
      "copies": [
        {
          "destination": "<(PRODUCT_DIR)",
          "files": [
            "<(module_root_dir)/CUESDK/mac/CUESDK.dylib"
          ]
        }
      ]
    }
  ]
}
